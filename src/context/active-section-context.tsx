"use client";

import React, { useState, useMemo, createContext, useContext} from 'react'
import type { SectionName } from '@/lib/types';


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

         // Without this the value object is new on every render, so every
         // consumer re-renders whenever anything above the provider renders.
         const value = useMemo(
                  () => ({ activeSection, setActiveSection }),
                  [activeSection],
         );

         return (
                  <ActiveSectionContext.Provider value={value}>
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
