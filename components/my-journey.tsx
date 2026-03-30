"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";

export default function MyJourney() {
  const ref = useSectionInView("My Journey", 0.5);

  return (
    <section
      id="my-journey"
      ref={ref}
      className="w-full scroll-mt-28 lg:max-w-none"
    >
      <div className="w-full max-w-[720px] lg:mx-0">
        <SectionHeading>My Journey</SectionHeading>
      </div>
      <VerticalTimeline
        className="journey-timeline"
        layout="1-column-left"
        lineColor="rgba(0, 0, 0, 0.06)"
      >
        {experiencesData.map((item, index) => (
          <VerticalTimelineElement
            key={`${item.title}-${index}`}
            contentStyle={{
              background: "#f3f4f6",
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              textAlign: "left",
              padding: "1rem 1.25rem",
            }}
            contentArrowStyle={{
              borderRight: "0.4rem solid #e5e7eb",
            }}
            date={item.date}
            dateClassName="!text-sm !font-medium !text-gray-500"
            icon={item.icon}
            iconStyle={{
              background: "white",
              color: "#111827",
              boxShadow: "0 0 0 4px rgba(255, 255, 255, 1)",
            }}
          >
            <h3 className="text-lg font-semibold capitalize leading-snug">
              {item.title}
            </h3>
            <p className="!mt-0 text-base font-normal">{item.location}</p>
            <ul className="!mt-3 space-y-1.5 text-sm leading-6 text-gray-700">
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
    </section>
  );
}
