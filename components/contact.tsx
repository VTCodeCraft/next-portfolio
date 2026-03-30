"use client";

import React from 'react';
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import { sendEmail } from '@/actions/sendEmail';
import SubmitBtn from './submit-btn';
import toast from "react-hot-toast";

export default function Contact() {
         const ref = useSectionInView("Contact", 0.5);
         return (
                  <motion.section
                           id="contact"
                           className="w-full scroll-mt-28  max-w-[38rem] text-center sm:mb-28 lg:mx-0 lg:text-left"
                           initial={{ opacity: 0, y: 50 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5 }}
                           viewport={{ once: true }}
                           ref={ref}
                  >
                           <SectionHeading>Contact Me</SectionHeading>

                           <p className="text-gray-600 dark:text-gray-400 mt-4 mb-8">
                                    Feel free to reach out to me directly at{" "}
                                    <a
                                             href="mailto:work.vishesh12.05@gmail.com"
                                             className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                             work.vishesh12.05@gmail.com
                                    </a>{" "}
                                    or through this form.
                           </p>

                           <form className="flex flex-col mt-10 w-full mb-4"
                                    action={async (formData) => {
                                             const { data, error } = await sendEmail(formData);

                                             if (error) {
                                                      toast.error(error);
                                                      return;
                                             }

                                             toast.success("Email sent successfully!");
                                    }}
                           >
                                    <input
                                             className="h-14 px-4 rounded-lg border text-gray-900 border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                                             type="email"
                                             name="senderEmail"
                                             placeholder="Your Email"
                                             required
                                             maxLength={500}
                                    />
                                    <textarea
                                             className="h-52 my-3 rounded-lg border text-gray-900 border-gray-200 p-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm resize-none"
                                             name="message"
                                             placeholder="Your Message..."
                                             required
                                             maxLength={500}
                                    />
                                    <SubmitBtn />
                           </form>
                  </motion.section>
         );
}
