import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
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
  SiCplusplus,
  SiExpress,
  SiFastapi,
  SiFramer,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
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

export const experiencesData = [
  {
    title: "B.Tech in Information Technology",
    location: "New Delhi, India",
    description:
      "• CGPA: 8.93 | (GGSIPU)\n" +
      "• Relevant Coursework: Data Structures, OOP, DBMS, Machine Learning, Web Programming, Introduction to CS\n" +
      "• Developed multiple full-stack applications using modern web technologies\n",
    icon: React.createElement(LuGraduationCap),
    date: "2023 - 2027",
  },
  {
    title: "Software Developer Intern",
    location: "New Delhi (Hybrid)",
    description:
      "• Built monday.com integrations using OAuth & GraphQL APIs\n" +
      "• Developed Chrome softphone extension for IVR-based click-to-call\n" +
      "• Automated CRM workflows via data pipelines\n" +
      "• Built full-stack scheduling system with timezone-aware slots & conflict-free real-time booking (React, TS, PostgreSQL, TypeORM)\n",
    icon: React.createElement(CgWorkAlt),
    date: "Jun 2025 - Jul 2025",
  },
] as const;

export const myProjects = [
  {
    title: "Finora - Finance Dashboard",
    points: [
      "Multi-route finance dashboard with analytics, transactions, and real-time currency conversion.",
      "Built using Next.js 16, React 19, Zustand, and Recharts.",
      "Responsive layout with role-based UI, dark mode, and persistent state management.",
    ],
    href: "https://finora.vtcodecraft.in/",
    repoHref: "https://github.com/VTCodeCraft/finance-dashboard",
    featured: true,
    tags: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "React 19", icon: SiReact },
      { id: 3, name: "Node.js", icon: SiNodedotjs },
      { id: 4, name: "PostgreSQL", icon: SiPostgresql },
      { id: 5, name: "Tailwind v4", icon: SiTailwindcss },
      { id: 6, name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    title: "EzMeet",
    points: [
      "Full-stack scheduling platform with timezone-aware availability and booking links.",
      "Google Calendar integration for conflict-free scheduling.",
      "Scalable backend architecture focused on reliable booking flows.",
    ],
    href: "#",
    repoHref: "https://github.com/VTCodeCraft/EzMeet",
    tags: [
      { id: 1, name: "Next.js", icon: SiNextdotjs },
      { id: 2, name: "Node.js", icon: SiNodedotjs },
      { id: 3, name: "PostgreSQL", icon: SiPostgresql },
      { id: 4, name: "Tailwind", icon: SiTailwindcss },
      { id: 5, name: "TypeScript", icon: SiTypescript },
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
};
