"use client";

import React from 'react'
import SectionHeading from './section-heading'
import { skillsData } from '@/lib/data'

export default function Skills() {
  return (
    <section id="skills" className="flex w-full flex-col items-center justify-center text-center lg:items-start lg:justify-start lg:text-left">
         <SectionHeading>Technical Skills</SectionHeading>
         <ul className=" flex frex-wrap justify-center gap-2 text-lg text-gray-800 mx-auto text-center lg:mx-0 lg:text-left">
                 {skillsData.map((skill , index) => (
                  <li className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full" key={index}>{skill}
                  </li>
         ))}
         </ul>
    </section>
  )
}
