import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiAndroid,
  SiAnthropic,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGithubcopilot,
  SiGooglechrome,
  SiGooglegemini,
  SiGraphql,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOnnx,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWebrtc,
  SiYolo,
} from "react-icons/si";

/**
 * The stack, as data.
 *
 * Every entry here is taken from the résumé or from current work. Nothing is
 * added because it is popular, and there are no proficiency levels, years or
 * ratings — those are unverifiable and are what make a skills section read as
 * a junior template.
 *
 * `kind` is the only per-item claim, and it states what the thing *is* rather
 * than how well it is known.
 *
 * Icons are optional on purpose. Some entries are concepts with no brand mark
 * and some vendors have none in the icon set, so the name always leads and the
 * icon is decoration when it happens to exist.
 */
export type Skill = {
  name: string;
  /** What the technology is. Never a proficiency. */
  kind: string;
  icon?: IconType;
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
      { name: "TypeScript", kind: "Language", icon: SiTypescript },
      { name: "JavaScript", kind: "Language", icon: SiJavascript },
      { name: "Python", kind: "Language", icon: SiPython },
      { name: "Java", kind: "Language", icon: SiOpenjdk },
      { name: "C/C++", kind: "Language", icon: SiCplusplus },
      { name: "SQL", kind: "Query language" },
    ],
  },
  {
    id: "web",
    label: "Web & runtime",
    skills: [
      { name: "React", kind: "UI library", icon: SiReact },
      { name: "Next.js", kind: "Framework", icon: SiNextdotjs },
      { name: "Node.js", kind: "Runtime", icon: SiNodedotjs },
      { name: "Express", kind: "Server framework", icon: SiExpress },
      { name: "GraphQL", kind: "Query layer", icon: SiGraphql },
      { name: "Tailwind CSS", kind: "Styling", icon: SiTailwindcss },
      { name: "shadcn/ui", kind: "Components", icon: SiShadcnui },
      { name: "Zustand", kind: "State" },
      { name: "Framer Motion", kind: "Animation", icon: SiFramer },
    ],
  },
  {
    id: "data",
    label: "Data",
    skills: [
      { name: "PostgreSQL", kind: "Database", icon: SiPostgresql },
      { name: "MongoDB", kind: "Database", icon: SiMongodb },
      { name: "Mongoose", kind: "ODM", icon: SiMongoose },
      { name: "MySQL", kind: "Database", icon: SiMysql },
      { name: "Redis", kind: "Cache", icon: SiRedis },
      { name: "Supabase", kind: "Platform", icon: SiSupabase },
      { name: "Neon", kind: "Serverless Postgres" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    skills: [
      { name: "AWS / EC2", kind: "Cloud", icon: FaAws },
      { name: "Docker", kind: "Containers", icon: SiDocker },
      { name: "Coolify", kind: "Self-hosted PaaS" },
      { name: "Linux", kind: "Operating system", icon: SiLinux },
      { name: "GitHub Actions", kind: "CI/CD", icon: SiGithubactions },
      { name: "Vercel", kind: "Hosting", icon: SiVercel },
    ],
  },
  {
    id: "ai",
    label: "AI & LLM",
    skills: [
      { name: "Google Gemini API", kind: "Model API", icon: SiGooglegemini },
      { name: "Claude / Anthropic", kind: "Model API", icon: SiAnthropic },
      { name: "OpenAI API", kind: "Model API", icon: SiOpenai },
      { name: "GitHub Copilot", kind: "Tooling", icon: SiGithubcopilot },
      { name: "LLM-assisted development", kind: "Practice" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", kind: "Version control", icon: SiGit },
      { name: "GitHub", kind: "Platform", icon: SiGithub },
      { name: "Postman", kind: "API client", icon: SiPostman },
      { name: "Figma", kind: "Design", icon: SiFigma },
      { name: "Chrome Extensions", kind: "Platform", icon: SiGooglechrome },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    /* Deliberately separate. Treating System Design or DSA as though they were
       libraries is the tell that a skills list was assembled rather than
       thought about. */
    skills: [
      { name: "Data Structures & Algorithms", kind: "Foundation" },
      { name: "System Design", kind: "Foundation" },
      { name: "Scalable Architecture", kind: "Foundation" },
      { name: "Object-Oriented Programming", kind: "Foundation" },
      { name: "REST APIs", kind: "Foundation" },
      { name: "API Integration", kind: "Foundation" },
    ],
  },
];

/**
 * Current work rather than general stack.
 *
 * These come from the Hyperion smart-glasses platform — real-time edge AI on
 * device — and are kept apart from the categories above on purpose. Folding
 * them in would present work in progress as settled general expertise, which
 * is the kind of overstatement a technical reader notices immediately.
 */
export const specializedSkills: Skill[] = [
  { name: "WebRTC", kind: "Real-time transport", icon: SiWebrtc },
  { name: "Real-time systems", kind: "Domain" },
  { name: "Computer Vision", kind: "Domain" },
  { name: "YOLO11", kind: "Object detection", icon: SiYolo },
  { name: "ONNX Runtime", kind: "Edge inference", icon: SiOnnx },
  { name: "React Native", kind: "Mobile", icon: SiReact },
  { name: "Native Android", kind: "Platform integration", icon: SiAndroid },
  { name: "Vision-language models", kind: "Model class" },
  { name: "AI inference pipelines", kind: "Domain" },
];

/** Counted rather than written down, so the heading cannot drift from the data. */
export const totalSkillCount =
  skillCategories.reduce((sum, category) => sum + category.skills.length, 0) +
  specializedSkills.length;
