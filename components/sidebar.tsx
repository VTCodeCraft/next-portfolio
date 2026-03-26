"use client";

import { useState } from "react";

const sections = [
  { name: "Introduction", href: "#introduction" },
  { name: "Technical skills", href: "#skills" },
  { name: "My Journey", href: "#my-journey" },
  { name: "Contact", href: "#contact" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed left-6 top-6 z-50 lg:hidden">
        <button
          type="button"
          aria-controls="mobile-sidebar"
          aria-expanded={isOpen}
          aria-label="Toggle section navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-full bg-white shadow-md transition"
        >
          <span className="block h-px w-5 bg-gray-900" />
          <span className="block h-px w-5 bg-gray-900" />
          <span className="block h-px w-5 bg-gray-900" />
        </button>

        {isOpen ? (
          <aside
            id="mobile-sidebar"
            className="mt-4 w-60 rounded-3xl bg-white p-6 shadow-xl"
          >
            <nav className="flex flex-col gap-6 text-gray-500">
              {sections.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 group transition"
                >
                  <span className="w-6 h-px bg-gray-300 group-hover:bg-black transition" />
                  <span className="group-hover:text-black transition">
                    {item.name}
                  </span>
                </a>
              ))}
            </nav>
          </aside>
        ) : null}
      </div>

      <aside className="hidden fixed left-10 top-1/2 -translate-y-1/2 text-gray-500 lg:flex lg:flex-col lg:gap-8">
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
    </>
  );
}
