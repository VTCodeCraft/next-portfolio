"use client";

import {
  LazyMotion,
  domAnimation,
  m,
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

function getRevealProps({
  delay = 0,
  distance = 28,
  duration = 0.5,
  amount = 0.2,
  once = true,
}: RevealProps) {
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

function getMountRevealProps({
  delay = 0,
  distance = 28,
  duration = 0.5,
}: RevealProps) {
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
    return (
      <m.section
        ref={ref}
        {...getRevealProps({ delay, distance, duration, amount, once })}
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
    return (
      <m.div
        ref={ref}
        {...getRevealProps({ delay, distance, duration, amount, once })}
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
    return (
      <m.article
        ref={ref}
        {...getRevealProps({ delay, distance, duration, amount, once })}
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
    return (
      <m.section
        ref={ref}
        {...getMountRevealProps({ delay, distance, duration })}
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
    return (
      <m.div
        ref={ref}
        {...getMountRevealProps({ delay, distance, duration })}
        {...props}
      >
        {children}
      </m.div>
    );
  },
);

export const MotionMountArticle = forwardRef<HTMLElement, MotionArticleProps>(
  function MotionMountArticle(
    { delay, distance, duration, children, ...props },
    ref,
  ) {
    return (
      <m.article
        ref={ref}
        {...getMountRevealProps({ delay, distance, duration })}
        {...props}
      >
        {children}
      </m.article>
    );
  },
);
