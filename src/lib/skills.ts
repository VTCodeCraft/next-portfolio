import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPnpm,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTailwindcss,
  SiThreedotjs,
  SiTurborepo,
  SiTypescript,
  SiVercel,
  SiWebrtc,
} from "react-icons/si";

/**
 * The stack, as data.
 *
 * Ordered for a software-engineering read: languages, then what is built with
 * them, then what stores and runs it, then the fundamentals underneath. Model
 * APIs are not a category here — they are tools used inside the work, and
 * listing them beside PostgreSQL implied they carried equal weight in the
 * stack. They live in `specialization` below instead.
 *
 * `kind` states what a thing *is*, never how well it is known. There are no
 * levels, percentages or years, because none of that is verifiable.
 */
export type Skill = {
  name: string;
  kind: string;
  icon?: IconType;
  /**
   * Official Simple Icons brand hex, used only on hover.
   *
   * Absent where the brand mark is black or near-black — Next.js, Express,
   * Vercel, Three.js, Expo, Prisma, Socket.IO, Java. Those would vanish
   * against the dark theme, so they resolve to the foreground colour instead
   * and simply brighten.
   */
  color?: string;
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "TypeScript", kind: "Language", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", kind: "Language", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Python", kind: "Language", icon: SiPython, color: "#3776AB" },
      { name: "Java", kind: "Language", icon: SiOpenjdk },
      { name: "C++", kind: "Language", icon: SiCplusplus, color: "#00599C" },
      { name: "C", kind: "Language", icon: SiC, color: "#A8B9CC" },
      { name: "SQL", kind: "Query language" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", kind: "UI library", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", kind: "Framework", icon: SiNextdotjs },
      { name: "React Native", kind: "Mobile", icon: SiReact, color: "#61DAFB" },
      { name: "Expo", kind: "Mobile toolchain", icon: SiExpo },
      { name: "Tailwind CSS", kind: "Styling", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Three.js", kind: "3D rendering", icon: SiThreedotjs },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    skills: [
      { name: "Node.js", kind: "Runtime", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", kind: "Server framework", icon: SiExpress },
      { name: "FastAPI", kind: "Server framework", icon: SiFastapi, color: "#009688" },
      { name: "REST APIs", kind: "Interface design" },
      { name: "GraphQL", kind: "Query layer", icon: SiGraphql, color: "#E10098" },
      { name: "Socket.IO", kind: "Realtime transport", icon: SiSocketdotio },
      { name: "WebRTC", kind: "Realtime media", icon: SiWebrtc },
      { name: "Concurrency", kind: "Systems" },
    ],
  },
  {
    id: "data",
    label: "Data",
    skills: [
      { name: "PostgreSQL", kind: "Database", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", kind: "Database", icon: SiMongodb, color: "#47A248" },
      { name: "Redis", kind: "Cache", icon: SiRedis, color: "#FF4438" },
      { name: "Prisma", kind: "ORM", icon: SiPrisma },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    skills: [
      { name: "AWS", kind: "Cloud", icon: FaAws, color: "#FF9900" },
      { name: "EC2", kind: "Compute", icon: FaAws, color: "#FF9900" },
      { name: "S3", kind: "Object storage", icon: FaAws, color: "#569A31" },
      { name: "Docker", kind: "Containers", icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", kind: "Hosting", icon: SiVercel },
      { name: "Coolify", kind: "Self-hosted PaaS" },
      { name: "Linux", kind: "Operating system", icon: SiLinux, color: "#FCC624" },
      { name: "Git", kind: "Version control", icon: SiGit, color: "#F05032" },
      { name: "CI/CD", kind: "Delivery" },
      { name: "GitHub Actions", kind: "Delivery", icon: SiGithubactions, color: "#2088FF" },
      { name: "Turborepo", kind: "Monorepo", icon: SiTurborepo, color: "#EF4444" },
      { name: "pnpm", kind: "Package manager", icon: SiPnpm, color: "#F69220" },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    /* Fundamentals, kept apart from libraries. Listing System Design beside a
       package is the tell that a stack was assembled rather than thought
       about. */
    skills: [
      { name: "Data Structures & Algorithms", kind: "Foundation" },
      { name: "Object-Oriented Programming", kind: "Foundation" },
      { name: "Operating Systems", kind: "Foundation" },
      { name: "Database Management Systems", kind: "Foundation" },
      { name: "Computer Networks", kind: "Foundation" },
      { name: "System Design", kind: "Foundation" },
    ],
  },
];

/**
 * Domains rather than tools.
 *
 * These read as "an engineer who also works on these systems", which is the
 * accurate framing. The model APIs and ML libraries that sit underneath them
 * are listed here rather than as a top-level stack category.
 */
export const specialization = [
  "AI-powered products",
  "Real-time systems",
  "WebRTC",
  "Edge inference",
  "Computer vision",
  "3D reconstruction",
];

/**
 * Kept out of the primary stack on purpose — these are things used inside the
 * work above, not the shape of the stack itself. Retained as data so the
 * future /experience route can surface them.
 */
export const aiToolchain = [
  "Vercel AI SDK",
  "LLM tool calling",
  "MCP",
  "OpenAI API",
  "Claude API",
  "DeepSeek API",
  "PyTorch",
  "CUDA",
  "YOLO",
];

/** Counted, so the heading cannot drift from the list. */
export const totalSkillCount = skillCategories.reduce(
  (sum, category) => sum + category.skills.length,
  0,
);
