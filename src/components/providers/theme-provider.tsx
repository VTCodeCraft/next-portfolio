"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "vt-theme";

type ThemeContextValue = {
  theme: Theme;
  /** Swap themes, sweeping from the given viewport point when possible. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* Structural type for the ViewTransition object. Declared here rather than
   relying on lib.dom, whose coverage of the API still varies by TS version. */
type ViewTransitionLike = {
  finished: Promise<void>;
  ready?: Promise<void>;
  updateCallbackDone?: Promise<void>;
};

/*
  The class on <html> is the single source of truth, not React state.

  The blocking head script sets it before React runs, so the provider only
  needs to read it. Subscribing to it rather than mirroring it into state
  means there is nothing to keep in sync, no setState during an effect, and
  no chance of the two disagreeing. The server snapshot is "dark", which is
  what the server-rendered markup says, so the first client render matches.
*/
const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
};

const readTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const readServerTheme = (): Theme => "dark";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    readTheme,
    readServerTheme,
  );
  /* Guards against a second sweep starting before the first has finished. */
  const isSweeping = useRef(false);

  const apply = useCallback((next: Theme) => {
    const root = document.documentElement;

    root.classList.toggle("dark", next === "dark");
    /* Keeps form controls, scrollbars and the browser's own surfaces in step
       with the page; without it a light page keeps dark scrollbars. */
    root.style.colorScheme = next;

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Private mode or blocked storage: the theme still switches, it just
         will not survive a reload. Not worth failing the interaction over. */
    }

    /* No setState: the class change above is the state, and the store
       subscription re-renders anything reading it. */
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const startViewTransition = (
        document as Document & {
          startViewTransition?: (cb: () => void) => ViewTransitionLike;
        }
      ).startViewTransition;

      if (!startViewTransition || reduced || !origin) {
        apply(next);
        return;
      }

      /*
        The sweep is a circle centred on the toggle, so its radius has to
        reach whichever viewport corner is furthest away — otherwise the old
        frame is still covering part of the screen when the animation ends
        and the rest of the page snaps.
      */
      const radius = Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y),
      );

      /*
        A second transition started while one is running aborts the first,
        and the browser rejects with InvalidStateError. Rather than let a
        fast double-click throw, the swap just happens without the sweep.
      */
      if (isSweeping.current) {
        apply(next);
        return;
      }

      root.style.setProperty("--theme-x", `${origin.x}px`);
      root.style.setProperty("--theme-y", `${origin.y}px`);
      root.style.setProperty("--theme-r", `${radius}px`);
      root.dataset.themeTransition = "";
      isSweeping.current = true;

      const cleanup = () => {
        isSweeping.current = false;
        delete root.dataset.themeTransition;
      };

      let transition: ViewTransitionLike;

      try {
        transition = startViewTransition.call(document, () => {
          apply(next);
        });
      } catch {
        /* startViewTransition can refuse outright — a hidden document is the
           common case. The theme still has to change. */
        apply(next);
        cleanup();
        return;
      }

      /*
        A ViewTransition exposes three promises and any of them can reject.
        `ready` is the one that rejects when the transition cannot start at
        all — a backgrounded tab is the usual reason — and catching only
        `finished` still leaves that one unhandled, which surfaces as a
        console error for something purely decorative. All three are
        swallowed; cleanup hangs off `finished` so it runs either way.
      */
      transition.ready?.catch(() => {});
      transition.updateCallbackDone?.catch(() => {});
      transition.finished.catch(() => {}).finally(cleanup);
    },
    [apply, theme],
  );

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

/**
 * Runs before first paint, inlined into the document head.
 *
 * Stored choice wins, then the system preference, then dark. Anything slower
 * than a blocking script here — an effect, a provider, a cookie round-trip —
 * paints the wrong theme first and flashes.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`;
