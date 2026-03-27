import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import { FaReact } from "react-icons/fa";

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