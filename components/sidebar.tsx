"use client";

const sections = [
  { name: "Introduction", href: "#introduction" },
  { name: "Technical skills", href: "#skills" },
  { name: "My Journey", href: "#my-journey" },
  { name: "Contact", href: "#contact" },
];

export default function Sidebar() {
    return (
    <aside className="hidden lg:flex flex-col gap-8 fixed left-10 top-1/2 -translate-y-1/2 text-gray-500">
      
      {sections.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex items-center gap-4 group transition"
        >
          <span className="w-6 h-px bg-gray-300 group-hover:bg-black transition" />
          <span className="group-hover:text-black transition">
            {item.name}
          </span>
        </a>
      ))}

    </aside>
    );
}