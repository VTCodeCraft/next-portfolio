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
                           className="w-full scroll-mt-28 max-w-[38rem] pb-2 text-center sm:mb-10 lg:mx-0 lg:text-left"
                           initial={{ opacity: 0, y: 50 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5 }}
                           viewport={{ once: true }}
                           ref={ref}
                  >
                           <SectionHeading>Contact Me</SectionHeading>

                           <p className="mb-8 mt-4 text-gray-600 dark:text-gray-400">
                                    Feel free to reach out to me directly at{" "}
                                    <a
                                             href="mailto:work.vishesh12.05@gmail.com"
                                             className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                             work.vishesh12.05@gmail.com
                                    </a>{" "}
                                    or through this form.
                           </p>

                           <form className="mt-10 mb-2 flex w-full flex-col"
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
                                             className="h-14 rounded-lg border border-gray-200 bg-white px-4 text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/45"
                                             type="email"
                                             name="senderEmail"
                                             placeholder="Your Email"
                                             required
                                             maxLength={500}
                                    />
                                    <textarea
                                             className="my-3 h-52 resize-none rounded-lg border border-gray-200 bg-white p-4 text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/45"
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
