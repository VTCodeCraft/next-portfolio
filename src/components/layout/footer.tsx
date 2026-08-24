import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiResend } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/VTCodeCraft", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/vishesh-tripathi-6b6a41213", icon: FaLinkedin },
  { label: "X", href: "https://x.com/VTCodeCraft_", icon: FaXTwitter },
  { label: "LeetCode", href: "https://leetcode.com/u/VTCodeCraft/", icon: SiLeetcode },
] as const;

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
    <footer className="px-4 pb-[max(5rem,env(safe-area-inset-bottom))] pt-2 text-center sm:pb-6">
      <div className="mx-auto max-w-lg border-t border-border pt-5">
        <small
          data-numeric
          className="mb-3 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
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
        {/* The hero no longer carries social links, so they live here. */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border pt-4">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-[11px] text-muted-foreground transition hover:text-foreground"
            >
              <social.icon className="text-sm opacity-55" />
              <span>{social.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
