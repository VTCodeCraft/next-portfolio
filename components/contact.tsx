"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

const fadeUp = (delay = 0) => ({
         initial: { opacity: 0, y: 20 },
         whileInView: { opacity: 1, y: 0 },
         transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
         viewport: { once: true },
});

export default function Contact() {
         const ref = useSectionInView("Contact", 0.5);

         return (
                  <motion.section
                           id="contact"
                           ref={ref}
                           className="relative w-full scroll-mt-28 max-w-[32rem] pb-2 text-center sm:mb-10 lg:mx-0 lg:text-left"
                           initial={{ opacity: 0 }}
                           whileInView={{ opacity: 1 }}
                           transition={{ duration: 0.4 }}
                           viewport={{ once: true }}
                  >
                           {/* Glow blob */}
                           <div
                                    aria-hidden
                                    className="pointer-events-none absolute -top-10 -left-8 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/8"
                           />

                           {/* Tag */}
                           <motion.p
                                    {...fadeUp(0)}
                                    className="mb-0.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400"
                           >
                                    Let's talk
                           </motion.p>

                           <motion.div {...fadeUp(0.05)}>
                                    <SectionHeading>Contact Me</SectionHeading>
                           </motion.div>

                           {/* Gradient rule */}
                           {/* <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                                    viewport={{ once: true }}
                                    className="my-3 h-px origin-left bg-gradient-to-r from-indigo-500 via-purple-400 to-transparent"
                           /> */}

                           <motion.p
                                    {...fadeUp(0.15)}
                                    className="mb-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400"
                           >
                                    Have a project in mind or just want to say hello? Reach me at{" "}
                                    <a
                                    href="mailto:work.vishesh12.05@gmail.com"
                                    className="group relative inline-block font-medium text-gray-800 dark:text-gray-200"
                                    >
                                    work.vishesh12.05@gmail.com
                                    <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
                                    </a>{" "}
                                    or drop a message below.
                           </motion.p>

      {/* Card */ }
      <motion.div
        {...fadeUp(0.25)}
        className="relative overflow-hidden rounded-xl border border-gray-200/80 bg-white/60 p-4 shadow-lg shadow-gray-200/40 backdrop-blur-md dark:border-white/8 dark:bg-white/[0.04] dark:shadow-black/30"
      >
        {/* Corner accent */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-gradient-to-bl from-indigo-100/60 to-transparent dark:from-indigo-500/10"
        />

        <form
          className="flex flex-col gap-2.5"
          action={async (formData) => {
            const { data, error } = await sendEmail(formData);
            if (error) {
              toast.error(error);
              return;
            }
            toast.success("Email sent successfully!");
          }}
        >
          {/* Email */}
          <div>
            <label className="mb-1 block text-left font-mono text-[0.6rem] uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Your Email
            </label>
            <input
              type="email"
              name="senderEmail"
              placeholder="Enter your email address"
              required
              maxLength={500}
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50/80 px-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 dark:focus:border-indigo-400/60 dark:focus:bg-white/8"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-1 block text-left font-mono text-[0.6rem] uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Write your message here..."
              required
              maxLength={500}
              className="h-32 w-full resize-none rounded-lg border border-gray-200 bg-gray-50/80 p-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 dark:focus:border-indigo-400/60 dark:focus:bg-white/8"
            />
          </div>

          <SubmitBtn />
        </form>
      </motion.div>

      <motion.p
        {...fadeUp(0.35)}
        className="mt-3 text-center text-[0.7rem] text-gray-400 dark:text-gray-600"
      >
        I usually reply within 24 hours ✦
      </motion.p>
    </motion.section>
  );
}