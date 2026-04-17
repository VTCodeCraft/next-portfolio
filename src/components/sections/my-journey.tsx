"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "../ui/section-heading";
import { MotionSection } from "@/components/ui/reveal";

export default function MyJourney() {
  const ref = useSectionInView("My Journey", 0.5);

  return (
    <MotionSection
      id="my-journey"
      ref={ref}
      delay={0.12}
      className="w-full scroll-mt-28 lg:max-w-none"
    >
      <div className="w-full max-w-[720px] lg:mx-0">
        <SectionHeading>&nbsp;My Journey</SectionHeading>
      </div>
      <VerticalTimeline
        className="journey-timeline"
        layout="1-column-left"
        lineColor="var(--journey-line-color)"
      >
        {experiencesData.map((item, index) => (
          <VerticalTimelineElement
            key={`${item.title}-${index}`}
            contentStyle={{
              background: "var(--journey-card-bg)",
              boxShadow: "var(--shadow-soft)",
              border: "1px solid var(--journey-card-border)",
              textAlign: "left",
              padding: "1rem 1.25rem",
            }}
            contentArrowStyle={{
              borderRight: "0.4rem solid var(--journey-card-arrow)",
            }}
            date={item.date}
            dateClassName="!text-sm !font-medium !text-muted-foreground"
            icon={item.icon}
            iconStyle={{
              background: "var(--journey-icon-bg)",
              color: "var(--journey-icon-fg)",
              boxShadow: "0 0 0 4px var(--journey-icon-ring)",
            }}
          >
            <h3 className="text-lg font-semibold capitalize leading-snug text-foreground">
              {item.title}
            </h3>
            <p className="!mt-0 text-base font-normal text-muted-foreground">{item.location}</p>
            <ul className="!mt-3 space-y-1.5 text-sm leading-6 text-muted-foreground">
              {item.description.split("\n").map((line, lineIndex) => (
                <li
                  key={`${item.title}-line-${lineIndex}`}
                  className={line.startsWith(" - ") ? "ml-4 list-none" : ""}
                >
                  {line}
                </li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </MotionSection>
  );
}

