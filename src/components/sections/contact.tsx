"use client";

import toast from "react-hot-toast";

import { sendEmail } from "@/actions/sendEmail";
import SectionHeading from "@/components/ui/section-heading";
import SubmitBtn from "@/components/ui/submit-btn";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-32">
      <SectionHeading index="06" rule>
        Contact
      </SectionHeading>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12">
        <div>
          <p className="type-statement text-foreground">
            Have something
            <br />
            worth building?
          </p>

          <p className="type-prose type-body mt-4 text-muted-foreground">
            Open to internships, full-time roles and collaborations. I usually
            reply within a day.
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
            <a
              href="mailto:work.vishesh12.05@gmail.com"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 type-button text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
            >
              Email me
            </a>
            <a
              href="https://x.com/VTCodeCraft_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 type-button text-muted-foreground transition hover:border-primary hover:text-foreground active:scale-[0.98]"
            >
              Connect on X
            </a>
          </div>
        </div>

        {/* The existing Resend-backed server action, unchanged. */}
        <div className="w-full rounded-2xl border border-border bg-[var(--surface-glass)] p-5 shadow-[var(--shadow-card)]">
          <p className="type-eyebrow mb-4 tracking-[0.16em]">Or send a note</p>

          <form
            className="flex flex-col gap-4"
            action={async (formData) => {
              const { error } = await sendEmail(formData);

              if (error) {
                toast.error(error);
                return;
              }

              toast.success("Message sent. I'll reply within a day.");
            }}
          >
            <div>
              <label
                htmlFor="senderEmail"
                className="type-eyebrow mb-1.5 block tracking-[0.14em]"
              >
                Your email
              </label>
              <input
                id="senderEmail"
                type="email"
                name="senderEmail"
                required
                maxLength={500}
                autoComplete="email"
                placeholder="name@example.com"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground transition placeholder:text-[var(--text-faint)] focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="type-eyebrow mb-1.5 block tracking-[0.14em]"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={5}
                placeholder="What are you building?"
                className="w-full resize-y rounded-lg border border-input bg-background p-3 text-sm text-foreground transition placeholder:text-[var(--text-faint)] focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
              />
            </div>

            <SubmitBtn />
          </form>
        </div>
      </div>
    </section>
  );
}
