"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload, HiOutlineMail } from "react-icons/hi";
import { BsArrowRight, BsTwitter } from "react-icons/bs";

export default function Intro() {
         function setActiveSection(arg0: string) {
                  throw new Error("Function not implemented.");
         }

         function setTimeOfLastClick(arg0: number) {
                  throw new Error("Function not implemented.");
         }

         return (
                  <section className="w-full flex justify-center">

                           {/* CENTERED CONTAINER */}
                           <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-16">

                                    {/* PROFILE IMAGE */}
                                    <motion.div
                                             initial={{ opacity: 0, scale: 0 }}
                                             animate={{ opacity: 1, scale: 1 }}
                                             className="shrink-0"
                                    >
                                             <Image
                                                      src="/profile.jpg"
                                                      alt="Vishesh Tripathi"
                                                      width="192"
                                                      height="192"
                                                      quality="95"
                                                      priority={true}
                                                      className="h-50 w-50 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
                                             />
                                    </motion.div>

                                    {/* CONTENT */}
                                    <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">

                                             {/* NAME */}
                                             <motion.h1 className="text-4xl sm:text-6xl font-bold tracking-tight"
                                                      initial={{ opacity: 0, y: 20 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{
                                                               delay: 0.25
                                                      }}
                                             >
                                                      Vishesh Tripathi
                                             </motion.h1>

                                             {/* ROLE */}
                                             <motion.p className="text-xl sm:text-2xl text-neutral-500 mt-2"
                                                      initial={{ opacity: 0, y: 20 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{
                                                               delay: 0.25
                                                      }}
                                             >
                                                      Full-Stack Developer
                                             </motion.p>

                                             {/* SOCIALS */}
                                             <motion.div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start"
                                                      initial={{ opacity: 0, y: 20 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{
                                                               delay: 0.2
                                                      }}
                                             >

                                                      <Link
                                                               href="https://github.com/VTCodeCraft"
                                                               target="_blank"
                                                               className="flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md hover:scale-105 transition"
                                                      >
                                                               <FaGithub />
                                                               GitHub
                                                      </Link>

                                                      <Link
                                                               href="https://linkedin.com/in/vishesh-tripathi-6b6a41213"
                                                               target="_blank"
                                                               className="flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md hover:scale-105 transition"
                                                      >
                                                               <FaLinkedin />
                                                               LinkedIn
                                                      </Link>

                                                      <Link
                                                               href="https://x.com/VTCodeCraft_"
                                                               target="_blank"
                                                               className="flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md hover:scale-105 transition"
                                                      >
                                                               <BsTwitter />
                                                               X
                                                      </Link>

                                                      <Link
                                                               href="mailto:work.vishesh12.05@gmail.com"
                                                               target="_blank"
                                                               className="flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md hover:scale-105 transition"
                                                      >
                                                               <HiOutlineMail />
                                                               Email
                                                      </Link>
                                             </motion.div>


                                             {/* DESCRIPTION */}
                                             <motion.p className="mt-8 text-lg text-neutral-700 leading-relaxed"
                                                      initial={{ opacity: 0, y: 20 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{
                                                               delay: 0.25
                                                      }}
                                             >
                                                      <span className="font-bold">Hello, I'm Vishesh.</span>{" "}
                                                      I'm a <span className="font-bold">full-stack developer</span> focused on{" "}
                                                      building <span className="italic">scalable real-world applications</span>{" "}
                                                      and solving problems using{" "}
                                                      <span className="font-bold">DSA in Java</span>. I specialize in{" "}
                                                      <span className="font-bold">React (Next.js)</span> and{" "}
                                                      <span className="font-bold">backend systems</span>.
                                             </motion.p>

                                             <motion.div className="flex flex-row items-center gap-4 mt-6 justify-center md:justify-start"
                                                      initial={{ opacity: 0, y: 20 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{
                                                               delay: 0.2
                                                      }}
                                             >

                                                      <Link
                                                               href="#contact"
                                                               className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none hover:scale-105 transition"
                                                      >
                                                               Contact me here
                                                               <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
                                                      </Link>

                                                      <a
                                                               href="/Vishesh_Tripathi_Resume.pdf"
                                                               download="Vishesh-Tripathi-Resume.pdf"
                                                               target="_blank"
                                                               rel="noopener noreferrer"
                                                               className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full border border-gray-200 hover:scale-105 transition"
                                                      >
                                                               Download CV
                                                               <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
                                                      </a>

                                             </motion.div>
                                    </div>
                           </div>
                  </section>
         );
}