import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import { FaReact } from "react-icons/fa";

export const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Experience", hash: "#experience" },
  { name: "Contact", hash: "#contact" },
] as const;

export const experiencesData = [
  {
    title: "B.Tech in Information Technology",
    location: "New Delhi, India",
    description:
      "Currently pursuing B.Tech from Bharati Vidyapeeth’s College of Engineering (GGSIPU) with a CGPA of 8.82.",
    icon: React.createElement(LuGraduationCap),
    date: "2023 - 2027",
  },
  {
    title: "Software Developer Intern",
    location: "New Delhi (Hybrid)",
    description:
      "Worked at FoundersCart Pvt. Ltd. where I built monday.com integrations, secure authentication flows, CRM data pipelines, and a Chrome softphone extension. Developed full-stack features using React, Node.js, Express, MongoDB, and MySQL.",
    icon: React.createElement(CgWorkAlt),
    date: "Jun 2025 - Jul 2025",
  },
  {
    title: "Full-Stack Developer",
    location: "India",
    description:
      "Building full-stack applications including scheduling platforms, AI-powered chat apps, and accessibility tools. Focused on scalable backend systems and clean UI/UX.",
    icon: React.createElement(FaReact),
    date: "2024 - Present",
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
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "C/C++",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "FastAPI",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Redis",
  "Supabase",
  "Tailwind",
  "REST APIs",
  "JWT",
  "Socket.io",
  "Git",
  "Docker",
] as const;