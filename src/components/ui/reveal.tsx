"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type RevealProps = {
  delay?: number;
  distance?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
};

type MotionSectionProps = HTMLMotionProps<"section"> & RevealProps;
type MotionDivProps = HTMLMotionProps<"div"> & RevealProps;
type MotionArticleProps = HTMLMotionProps<"article"> & RevealProps;
type MotionListItemProps = HTMLMotionProps<"li"> & RevealProps;

const loadFeatures = () => Promise.resolve(domAnimation);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}

function getTransition(delay = 0, duration = 0.5) {
  return {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  };
}

/*
  Every reveal below collapses to "already there" when the visitor has asked
  for reduced motion. Travel plus fade is exactly the kind of movement that
  triggers vestibular symptoms, and none of it carries information — the
  content is identical either way, so there is nothing to degrade gracefully
  into. It simply starts visible.
*/
function getRevealProps(
  { delay = 0, distance = 28, duration = 0.5, amount = 0.2, once = true }: RevealProps,
  reduced: boolean | null,
) {
  if (reduced) {
    return { initial: false as const, viewport: { once, amount } };
  }

  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    transition: getTransition(delay, duration),
    viewport: {
      once,
      amount,
    },
  };
}

function getMountRevealProps(
  { delay = 0, distance = 28, duration = 0.5 }: RevealProps,
  reduced: boolean | null,
) {
  if (reduced) {
    return { initial: false as const };
  }

  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: getTransition(delay, duration),
  };
}

export const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(
  function MotionSection(
    { delay, distance, duration, amount, once, children, ...props },
    ref,
  ) {
    const reduced = useReducedMotion();

    return (
      <m.section
        ref={ref}
        {...getRevealProps({ delay, distance, duration, amount, once }, reduced)}
        {...props}
      >
        {children}
      </m.section>
    );
  },
);

export const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  function MotionDiv(
    { delay, distance, duration, amount, once, children, ...props },
    ref,
  ) {
    const reduced = useReducedMotion();

    return (
      <m.div
        ref={ref}
        {...getRevealProps({ delay, distance, duration, amount, once }, reduced)}
        {...props}
      >
        {children}
      </m.div>
    );
  },
);

export const MotionArticle = forwardRef<HTMLElement, MotionArticleProps>(
  function MotionArticle(
    { delay, distance, duration, amount, once, children, ...props },
    ref,
  ) {
    const reduced = useReducedMotion();

    return (
      <m.article
        ref={ref}
        {...getRevealProps({ delay, distance, duration, amount, once }, reduced)}
        {...props}
      >
        {children}
      </m.article>
    );
  },
);

export const MotionMountSection = forwardRef<HTMLElement, MotionSectionProps>(
  function MotionMountSection(
    { delay, distance, duration, children, ...props },
    ref,
  ) {
    const reduced = useReducedMotion();

    return (
      <m.section
        ref={ref}
        {...getMountRevealProps({ delay, distance, duration }, reduced)}
        {...props}
      >
        {children}
      </m.section>
    );
  },
);

export const MotionMountDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  function MotionMountDiv(
    { delay, distance, duration, children, ...props },
    ref,
  ) {
    const reduced = useReducedMotion();

    return (
      <m.div
        ref={ref}
        {...getMountRevealProps({ delay, distance, duration }, reduced)}
        {...props}
      >
        {children}
      </m.div>
    );
  },
);

/*
  A list row that reveals on mount.

  Added so a staggered archive can stay a real <ol>/<li>: wrapping each row
  in a motion <div> would either break the list semantics or push a
  redundant element between the list and its items.
*/
export const MotionMountListItem = forwardRef<
  HTMLLIElement,
  MotionListItemProps
>(function MotionMountListItem(
  { delay, distance, duration, children, ...props },
  ref,
) {
  const reduced = useReducedMotion();

  return (
    <m.li
      ref={ref}
      {...getMountRevealProps({ delay, distance, duration }, reduced)}
      {...props}
    >
      {children}
    </m.li>
  );
});

export const MotionMountArticle = forwardRef<HTMLElement, MotionArticleProps>(
  function MotionMountArticle(
    { delay, distance, duration, children, ...props },
    ref,
  ) {
    const reduced = useReducedMotion();

    return (
      <m.article
        ref={ref}
        {...getMountRevealProps({ delay, distance, duration }, reduced)}
        {...props}
      >
        {children}
      </m.article>
    );
  },
);
