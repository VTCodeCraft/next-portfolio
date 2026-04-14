import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiResend } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const techStack = [
  {
    name: "Next.js",
    icon: RiNextjsFill,
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
  },
  {
    name: "Tailwind CSS",
    icon: RiTailwindCssFill,
  },
  {
    name: "Framer Motion",
    icon: TbBrandFramerMotion,
  },
  {
    name: "Resend",
    icon: SiResend,
  },
] as const;

export default function Footer() {
  return (
    <footer className="px-4 pb-6 text-center">
      <div className="mx-auto max-w-lg border-t border-border pt-5">
        <small className="mb-3 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
          &copy; {new Date().getFullYear()} Vishesh Tripathi
        </small>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] text-muted-foreground">
          <span>Built with</span>
          {techStack.map((tech) => {
            const Icon = tech.icon;

            return (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 text-muted-foreground"
              >
                <Icon className="text-sm opacity-70" />
                <span className="font-medium">{tech.name}</span>
              </span>
            );
          })}
        </div>
        <Link
          href="https://github.com/VTCodeCraft/next-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[11px] text-muted-foreground transition hover:text-foreground"
        >
          <FaGithub className="text-sm opacity-45" />
          <span>View repository</span>
        </Link>
      </div>
    </footer>
  );
}
