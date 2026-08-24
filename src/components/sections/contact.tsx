"use client";

import React from "react";
import SectionHeading from "../ui/section-heading";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "../ui/submit-btn";
import toast from "react-hot-toast";
import { MotionMountSection } from "@/components/ui/reveal";

export default function Contact() {
  const ref = useSectionInView("Contact", 0.5);

  return (
    <MotionMountSection
      id="contact"
      ref={ref}
      delay={0.14}
      className="relative w-full scroll-mt-32 pb-2 text-left sm:mb-10"
    >
      <SectionHeading index="03" rule>
        Contact Me
      </SectionHeading>

      <p className="type-eyebrow mb-3 text-primary">Let&apos;s talk</p>

      <p className="type-prose mb-6 text-sm text-muted-foreground">
        Have a project in mind or just want to say hello? Reach me at{" "}
        <a
          href="mailto:work.vishesh12.05@gmail.com"
          className="group relative inline-block font-medium text-foreground"
        >
          work.vishesh12.05@gmail.com
          <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
        </a>{" "}
        or drop a message below.
      </p>

      {/* Deliberately narrower than the column and left-aligned: a form does
          not want a 42rem measure, and the offset keeps the page asymmetric. */}
      <div className="relative max-w-[34rem] overflow-hidden rounded-xl border border-border bg-[var(--surface-glass)] p-4 shadow-[var(--shadow-card)] backdrop-blur-md">
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-gradient-to-bl from-[var(--surface-accent-soft)] to-transparent"
        />

        <form
          className="flex flex-col gap-2.5"
          action={async (formData) => {
            const { error } = await sendEmail(formData);
            if (error) {
              toast.error(error);
              return;
            }
            toast.success("Email sent successfully!");
          }}
        >
          <div>
            <label className="mb-1 block text-left font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              Your Email
            </label>
            <input
              type="email"
              name="senderEmail"
              placeholder="Enter your email address"
              required
              maxLength={500}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-ring focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-left font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Write your message here..."
              required
              maxLength={500}
              className="h-32 w-full resize-none rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-ring focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <SubmitBtn />
        </form>
      </div>

      <p className="mt-3 max-w-[34rem] text-center text-[0.7rem] text-muted-foreground">
        I usually reply within 24 hours
      </p>
    </MotionMountSection>
  );
}

