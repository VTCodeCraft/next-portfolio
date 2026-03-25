"use client"

import { section } from 'framer-motion/client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BsArrowRight, BsLinkedin } from 'react-icons/bs'
import { HiDownload } from 'react-icons/hi'
import { FaGithubSquare } from 'react-icons/fa'

export default function intro() {
         function setActiveSection(arg0: string) {
                  throw new Error('Function not implemented.')
         }

         function setTimeOfLastClick(arg0: number) {
                  throw new Error('Function not implemented.')
         }

         return (
                  <section className="mb-28 max-w-50rem text-center sm:mb-0">
                           <div className='flex items-center justify-center'>
                                    <div className='relative'>
                                             <motion.div
                                                      initial={{ opacity: 0, scale: 0 }}
                                                      animate={{ opacity: 1, scale: 1 }}
                                                      transition={{
                                                               type: "tween",
                                                               duration: 0.25,
                                                      }}
                                             >
                                                      <Image src="/profile.jpg" alt="Vishesh Tripathi" width="192" height="192" quality="95" priority={true}
                                                               className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white
                                    shadow-xl"/>
                                                      <motion.span
                                                               className="absolute bottom-0 right-0 text-4xl origin-bottom-right"
                                                               initial={{ opacity: 0, scale: 0, rotate: 0 }}
                                                               animate={{
                                                                        opacity: 1,
                                                                        scale: 1,
                                                                        rotate: [0, 20, -10, 20, -5, 10, 0], // waving motion
                                                               }}
                                                               transition={{
                                                                        delay: 0.5,
                                                                        duration: 1,
                                                                        ease: "easeInOut",
                                                               }}
                                                      >
                                                               👋
                                                      </motion.span>
                                             </motion.div>

                                    </div>

                           </div>

                           <motion.p
                                    className="mb-10 mt-4 px-4 text-2xl font-medium leading-normal! sm:text-4xl"
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                           >
                                    <span className="font-bold">Hello, I'm Vishesh.</span>{" "}
                                    I'm a <span className="font-bold">full-stack developer</span> focused on{" "}
                                    building <span className="italic">scalable real-world applications</span>{" "}
                                    and solving problems using{" "}
                                    <span className="underline">DSA in Java</span>. I specialize in{" "}
                                    <span className="font-bold">React (Next.js)</span> and{" "}
                                    <span className="font-bold">backend systems</span>.
                           </motion.p>

                           <motion.div
                                    className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                             delay: 0.1,
                                    }}
                           >
                                    <Link
                                             href="#contact"
                                             className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-5 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
                                             onClick={() => {
                                                      setActiveSection("Contact");
                                                      setTimeOfLastClick(Date.now());
                                             }}
                                    >
                                             Contact me here{" "}
                                             <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
                                    </Link>

                                    <a
                                             className="group bg-white px-7 py-3 flex items-center gap-5 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack"
                                             href="/CV.pdf"
                                             download
                                    >
                                             Download CV{" "}
                                             <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
                                    </a>

                                    <a
                                             href="https://linkedin.com/in/vishesh-tripathi-6b6a41213"
                                             target="_blank"
                                            className="bg-white border-white/30 p-4 rounded-full hover:scale-110 transition"
                                    >
                                             <BsLinkedin />
                                    </a>

                                    <a
                                             href="https://github.com/VTCodeCraft"
                                             target="_blank"
                                             className="bg-white text-black p-4 text-xl rounded-full hover:scale-110 transition"
                                    >
                                             <FaGithubSquare />
                                    </a>
                           </motion.div>
                  </section>
         )
}
