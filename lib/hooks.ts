import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName, threshold: number = 0.75) {
         const [ref, inView] = useInView({
                  threshold: threshold,
         });
         const { activeSection, setActiveSection } = useActiveSectionContext();

         useEffect(() => {
                  if (inView && activeSection !== sectionName) {
                           setActiveSection(sectionName);
                  }
         }, [activeSection, inView, setActiveSection, sectionName]);

         return ref;
}
