"use client";

import React from 'react'
import SectionHeading from './section-heading'
import { skillsData } from '@/lib/data'

export default function Skills() {
  return (
    <section id="skills" className="flex w-full flex-col items-center justify-center text-center lg:items-start lg:justify-start lg:text-left">
         <SectionHeading>Technical Skills</SectionHeading>
         <ul className="mx-auto text-center lg:mx-0 lg:text-left">
                 {skillsData.map((skill , index) => (
                  <li key={index}>{skill}
                  </li>
         ))}
         </ul>
    </section>
  )
}
