import React from "react";
import {
  FaCss3Alt,
  FaDocker,
  FaGithub,
  FaHtml5,
  FaJava,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiClerk,
  SiCplusplus,
  SiExpress,
  SiFastapi,
  SiFramer,
  SiGooglecalendar,
  SiGooglegemini,
  SiJavascript,
  SiMediapipe,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiZoom,
} from "react-icons/si";
import { TbApi, TbBinaryTree } from "react-icons/tb";

export const links = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
] as const;

export const sections = [
  { name: "Introduction", hash: "#introduction" },
  { name: "Skills", hash: "#skills" },
  { name: "My Journey", hash: "#my-journey" },
  { name: "Contact", hash: "#contact" },
] as const;

/** Compact identity metadata beside the hero. */
export const identityMeta = [
  { label: "Based in", value: "New Delhi, India" },
  { label: "Timezone", value: "IST · UTC+5:30", mono: true },
  { label: "Now", value: "Hyperion Future Tech" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/VTCodeCraft" },
  { label: "LinkedIn", href: "https://linkedin.com/in/vishesh-tripathi-6b6a41213" },
  { label: "Peerlist", href: "https://peerlist.io/vtcodecraft" },
  { label: "X", href: "https://x.com/VTCodeCraft_" },
  { label: "LeetCode", href: "https://leetcode.com/u/VTCodeCraft/" },
  { label: "Email", href: "mailto:work.vishesh12.05@gmail.com" },
] as const;

export const experiencesData = [
  {
    role: "Software Engineer Intern",
    company: "Hyperion Future Tech",
    date: "2026 — Now",
    current: true,
    description:
      "Real-time object detection running on smart glasses — ONNX Runtime and YOLO11 on React Native with native Android, plus custom model training for domain-specific detection.",
  },
  {
    role: "Software Developer Intern",
    company: "FoundersCart",
    date: "2025",
    current: false,
    description:
      "Two monday.com CRM extensions and a WebRTC softphone published to the Chrome Web Store, letting sales teams call straight from a lead. Qualified leads rose 20%.",
  },
] as const;

export const educationData = {
  degree: "B.Tech, Information Technology",
  school: "Bharati Vidyapeeth's College of Engineering, GGSIPU",
  date: "2023 — 2027",
  detail: "CGPA 8.95 · Minor in CSE and Advanced Technologies, IIT Mandi",
} as const;

export const myProjects = [
  {
    title: "Clutchly - AI Voice Interview Coach",
    shortTitle: "Clutchly",
    summary:
      "An AI interview coach you talk to out loud. It listens, adapts its next question, and remembers what you struggled with last time.",
    stack: "Deepgram Voice Agent · Gemini 2.5 · Cognee · Prisma",
    outcome:
      "Full-duplex speech pipeline with per-stage token and cost tracking.",
    flagship: 1,
    points: [
      "AI voice interview coach with a full-duplex speech pipeline — Deepgram Voice Agent, Nova-3 STT, and Aura-2 TTS.",
      "Real-time adaptive question generation via Gemini 2.5 with structured multi-dimensional answer evaluation.",
      "Long-term semantic graph memory (Cognee Cloud) recalls past weaknesses to personalize sessions, plus per-stage token and cost observability.",
    ],
    href: "https://interview-memory-agent.vercel.app/",
    repoHref: "https://github.com/VTCodeCraft/interview-memory-agent",
    featured: true,
    tags: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "TypeScript", icon: SiTypescript },
      { id: 3, name: "Gemini 2.5", icon: SiGooglegemini },
      { id: 4, name: "Prisma", icon: SiPrisma },
      { id: 5, name: "PostgreSQL", icon: SiPostgresql },
      { id: 6, name: "Clerk", icon: SiClerk },
    ],
  },
  {
    title: "HumanCaptcha",
    shortTitle: "HumanCaptcha",
    summary:
      "A CAPTCHA you solve with your hands instead of your mouse — hand tracking plus a spatial puzzle a script cannot fake.",
    stack: "MediaPipe · Canvas API · Zustand · Framer Motion",
    outcome: "Ships as a drop-in <HumanCaptcha /> React component.",
    flagship: 2,
    points: [
      "Browser-native CAPTCHA replacing mouse-and-keyboard verification with MediaPipe hand-gesture tracking and cognitive puzzles.",
      "Live camera capture, pinch-based cursor control, and multi-step spatial interaction to resist bot automation.",
      "Reusable embeddable SDK — a drop-in <HumanCaptcha /> React component with dynamically generated image puzzles.",
    ],
    href: "https://human-captcha.vercel.app/",
    repoHref: "https://github.com/VTCodeCraft/human-captcha",
    featured: true,
    tags: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "TypeScript", icon: SiTypescript },
      { id: 3, name: "MediaPipe", icon: SiMediapipe },
      { id: 4, name: "Tailwind CSS", icon: SiTailwindcss },
      { id: 5, name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    title: "EzMeet",
    /*
      Third featured slot on the projects route. Of what remains it is the
      only project with both a live deployment and engineering detail beyond
      a stack list — the other two entries have no deployment at all.

      Deliberately no `flagship` rank: that field marks the homepage's curated
      pair, which carry authored shortTitle/summary/stack/outcome copy that
      this entry does not have. Without a rank it simply sorts last among the
      featured three.
    */
    featured: true,
    points: [
      "Full-stack meeting scheduling platform productized from an internship prototype into a production-ready system.",
      "Timezone-aware UTC slot management with conflict-resolution logic for zero scheduling conflicts across time zones.",
      "Google Calendar, Google Meet, and Zoom integrations covering end-to-end event creation, availability, and booking.",
    ],
    href: "https://ez-meet-xyz.vercel.app/",
    repoHref: "https://github.com/VTCodeCraft/EzMeet",
    tags: [
      { id: 1, name: "React", icon: SiReact },
      { id: 2, name: "Node.js", icon: SiNodedotjs },
      { id: 3, name: "Express.js", icon: SiExpress },
      { id: 4, name: "Supabase", icon: SiSupabase },
      { id: 5, name: "Google Calendar", icon: SiGooglecalendar },
      { id: 6, name: "Zoom", icon: SiZoom },
    ],
  },
  {
    title: "AI Chat Bot",
    points: [
      "Real-time chat application with AI integration and live messaging.",
      "Socket.io powers instant communication and updates.",
      "Redis handles caching and session management.",
    ],
    href: "#",
    repoHref: "https://github.com/VTCodeCraft/AI-Chat-Bot",
    tags: [
      { id: 1, name: "React", icon: SiReact },
      { id: 2, name: "Node.js", icon: SiNodedotjs },
      { id: 3, name: "MongoDB", icon: SiMongodb },
      { id: 4, name: "Redis", icon: SiRedis },
    ],
  },
  {
    title: "Portfolio Website",
    points: [
      "Modern personal portfolio showcasing projects and skills.",
      "Built with React and Vite for strong performance.",
      "Focused on smooth animations and a clean UI.",
    ],
    href: "#",
    repoHref: "https://github.com/VTCodeCraft/Portfolio-Website",
    tags: [
      { id: 1, name: "React", icon: SiReact },
      { id: 2, name: "Tailwind", icon: SiTailwindcss },
    ],
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "FastAPI",
  "Python",
  "Java",
  "C/C++",
  "DSA",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Supabase",
  "Redis",
  "REST APIs",
  "GitHub",
  "Docker",
  "Linux",
  "Tailwind CSS",
  "Framer Motion",
] as const;

export const skillIconsData: Record<string, React.ReactElement> = {
  HTML: React.createElement(FaHtml5),
  CSS: React.createElement(FaCss3Alt),
  JavaScript: React.createElement(SiJavascript),
  TypeScript: React.createElement(SiTypescript),
  React: React.createElement(FaReact),
  "Next.js": React.createElement(SiNextdotjs),
  "Node.js": React.createElement(FaNodeJs),
  "Express.js": React.createElement(SiExpress),
  FastAPI: React.createElement(SiFastapi),
  Python: React.createElement(FaPython),
  Java: React.createElement(FaJava),
  "C/C++": React.createElement(SiCplusplus),
  DSA: React.createElement(TbBinaryTree),
  MongoDB: React.createElement(SiMongodb),
  MySQL: React.createElement(SiMysql),
  PostgreSQL: React.createElement(SiPostgresql),
  Supabase: React.createElement(SiSupabase),
  Redis: React.createElement(SiRedis),
  "REST APIs": React.createElement(TbApi),
  GitHub: React.createElement(FaGithub),
  Docker: React.createElement(FaDocker),
  Linux: React.createElement(FaLinux),
  "Tailwind CSS": React.createElement(SiTailwindcss),
  "Framer Motion": React.createElement(SiFramer),
};

export const skillColors: Record<string, string> = {
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  "Next.js": "#f8fafc",
  "Node.js": "#339933",
  "Express.js": "#e5e7eb",
  FastAPI: "#009688",
  Python: "#3776AB",
  Java: "#67e8f9",
  "C/C++": "#00599C",
  DSA: "#8B5CF6",
  MongoDB: "#47A248",
  MySQL: "#93c5fd",
  PostgreSQL: "#336791",
  Supabase: "#3ECF8E",
  Redis: "#DC382D",
  "REST APIs": "#0EA5E9",
  GitHub: "#f8fafc",
  Docker: "#2496ED",
  Linux: "#FCC624",
  "Tailwind CSS": "#06B6D4",
  "Framer Motion": "#E10098",
  "Gemini 2.5": "#8E75B2",
  Prisma: "#5A67D8",
  Clerk: "#6C47FF",
  MediaPipe: "#0097A7",
  "Google Calendar": "#4285F4",
  Zoom: "#2D8CFF",
};
