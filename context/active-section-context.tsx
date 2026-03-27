"use client";

import React, { useState , createContext, useContext} from 'react'
import {sections} from '@/lib/data'

type SectionName = typeof sections[number]["name"];

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
}

type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
}

export const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({children}: ActiveSectionContextProviderProps) {
         const [activeSection, setActiveSection] = useState<SectionName>("Introduction");
         return (
                  <ActiveSectionContext.Provider 
                  value={{ 
                           activeSection,
                           setActiveSection 
                  }}>
                    {children}
                  </ActiveSectionContext.Provider>
         )
}

export function useActiveSectionContext() {
         const context = useContext(ActiveSectionContext);
         if (context == null) {
                  throw new Error("useActiveSection must be used within an ActiveSectionContextProvider");
         }
         return context;
}
