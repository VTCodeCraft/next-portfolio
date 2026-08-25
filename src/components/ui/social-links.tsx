import Link from "next/link";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaRegCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";

import { socialLinks } from "@/lib/data";

/*
  react-icons has no Peerlist mark, so it falls back to a neutral glyph in the
  accent colour rather than borrowing an unrelated brand icon.
*/
const ICONS: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Peerlist: FaRegCircle,
  X: FaXTwitter,
  LeetCode: SiLeetcode,
  Email: HiOutlineMail,
};

/**
 * Compact icon row. Segmented rather than free-floating so it reads as one
 * object under the hero buttons instead of six loose links.
 */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`inline-flex list-none flex-wrap items-center overflow-hidden rounded-xl border border-border bg-[var(--surface-glass)] p-0 ${className}`}
    >
      {socialLinks.map((social, index) => {
        const Icon = ICONS[social.label] ?? FaRegCircle;
        const isExternal = social.href.startsWith("http");

        return (
          <li key={social.label}>
            <Link
              href={social.href}
              aria-label={social.label}
              title={social.label}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`flex h-11 w-11 items-center justify-center text-base transition hover:bg-accent hover:text-foreground ${
                social.label === "Peerlist" ? "text-primary" : "text-muted-foreground"
              } ${index > 0 ? "border-l border-border" : ""}`}
            >
              <Icon aria-hidden />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
