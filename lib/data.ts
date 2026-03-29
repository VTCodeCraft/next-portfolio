import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaLinux, FaGithub } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiNextdotjs, SiExpress, SiFastapi, SiMongodb, SiMysql, SiPostgresql, SiSupabase, SiRedis, SiTailwindcss, SiFramer, SiCplusplus } from "react-icons/si";
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
      "• CGPA: 8.93 (GGSIPU)\n" +
      "• Relevant Coursework: Data Structures, OOP, DBMS, Machine Learning, Web Programming, Introduction to CS\n" +
      "• Developed multiple full-stack applications using modern web technologies\n",
    icon: React.createElement(LuGraduationCap),
    date: "2023 - 2027",
  },
  {
    title: "Software Developer Intern",
    location: "New Delhi (Hybrid)",
    description:
      "• Engineered monday.com integrations with secure OAuth flows and GraphQL APIs\n" +
      "• Built a Chrome-based softphone extension enabling click-to-call via IVR systems\n" +
      "• Designed and implemented CRM data pipelines to automate lead management workflows\n" +
      "• Built a full-stack meeting scheduling application:\n" +
      " - Implemented dynamic time-slot generation with timezone-aware logic\n" +
      " - Designed conflict-free booking system with real-time availability updates\n" +
      " - Used React, TypeScript, PostgreSQL, and TypeORM for robust system design\n",
    icon: React.createElement(CgWorkAlt),
    date: "Jun 2025 - Jul 2025",
  },
] as const;

export const projectsData = [
  {
    title: "EzMeet",
    description:
      "A full-stack scheduling platform with timezone-aware availability, booking links, and Google Calendar integration for conflict-free scheduling.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "TypeORM", "Tailwind"],
  },
  {
    title: "AI Chat Bot",
    description:
      "Real-time chat application with Google Gemini AI integration, Socket.io for live communication, and Redis for caching and session management.",
    tags: ["MERN", "Socket.io", "Redis", "Gemini AI"],
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio website built with React and Vite showcasing projects and skills with a modern UI.",
    tags: ["React", "Vite", "Tailwind"],
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
  "HTML":          React.createElement(FaHtml5),
  "CSS":           React.createElement(FaCss3Alt),
  "JavaScript":    React.createElement(SiJavascript),
  "TypeScript":    React.createElement(SiTypescript),
  "React":         React.createElement(FaReact),
  "Next.js":       React.createElement(SiNextdotjs),
  "Node.js":       React.createElement(FaNodeJs),
  "Express.js":    React.createElement(SiExpress),
  "FastAPI":       React.createElement(SiFastapi),
  "Python":        React.createElement(FaPython),
  "Java":          React.createElement(FaJava),
  "C/C++":         React.createElement(SiCplusplus),
  "DSA":           React.createElement(TbBinaryTree),
  "MongoDB":       React.createElement(SiMongodb),
  "MySQL":         React.createElement(SiMysql),
  "PostgreSQL":    React.createElement(SiPostgresql),
  "Supabase":      React.createElement(SiSupabase),
  "Redis":         React.createElement(SiRedis),
  "REST APIs":     React.createElement(TbApi),
  "GitHub":        React.createElement(FaGithub),
  "Docker":        React.createElement(FaDocker),
  "Linux":         React.createElement(FaLinux),
  "Tailwind CSS":  React.createElement(SiTailwindcss),
  "Framer Motion": React.createElement(SiFramer),
};

export const skillColors: Record<string, string> = {
  "HTML": "#E34F26",
  "CSS": "#1572B6",
  "JavaScript": "#F7DF1E",
  "TypeScript": "#3178C6",
  "React": "#61DAFB",
  "Next.js": "#000000",
  "Node.js": "#339933",
  "Express.js": "#444444",
  "FastAPI": "#009688",
  "Python": "#3776AB",
  "Java": "#007396",
  "C/C++": "#00599C",
  "DSA": "#8B5CF6",
  "MongoDB": "#47A248",
  "MySQL": "#4479A1",
  "PostgreSQL": "#336791",
  "Supabase": "#3ECF8E",
  "Redis": "#DC382D",
  "REST APIs": "#0EA5E9",
  "GitHub": "#181717",
  "Docker": "#2496ED",
  "Linux": "#FCC624",
  "Tailwind CSS": "#06B6D4",
  "Framer Motion": "#E10098",
};