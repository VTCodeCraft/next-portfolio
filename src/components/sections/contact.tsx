import SectionHeading from "@/components/ui/section-heading";

export default function Contact() {
  return (
    <section id="contact" className="page-column scroll-mt-32">
      <SectionHeading index="05" rule>
        Contact
      </SectionHeading>

      <div className="pt-2 text-center">
        <p className="font-heading text-xl font-medium leading-[1.35] tracking-[-0.035em] text-foreground sm:text-2xl">
          Have something
          <br />
          worth building?
        </p>

        <p className="mx-auto mt-4 max-w-[42ch] text-[0.82rem] leading-relaxed text-muted-foreground">
          Open to internships, full-time roles and collaborations. I usually
          reply within a day.
        </p>

        <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
          <a
            href="mailto:work.vishesh12.05@gmail.com"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-[0.82rem] font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
          >
            Email me
          </a>
          <a
            href="https://x.com/VTCodeCraft_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-[0.82rem] font-medium text-muted-foreground transition hover:border-primary hover:text-foreground active:scale-[0.98]"
          >
            Connect on X
          </a>
        </div>
      </div>
    </section>
  );
}
