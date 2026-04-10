import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName, threshold: number = 0.75) {
         const [ref, inView] = useInView({
                  threshold: threshold,
         });
         const { activeSection, setActiveSection } = useActiveSectionContext();
         const wasInView = useRef(false);

         useEffect(() => {
                  const justEnteredView = inView && !wasInView.current;

                  if (justEnteredView && activeSection !== sectionName) {
                           setActiveSection(sectionName);
                  }

                  wasInView.current = inView;
         }, [activeSection, inView, setActiveSection, sectionName]);

         return ref;
}
