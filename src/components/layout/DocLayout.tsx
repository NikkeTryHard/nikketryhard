import React from "react";
import { Sidebar } from "./Sidebar";

interface DocLayoutProps {
  children: React.ReactNode;
}

export const DocLayout: React.FC<DocLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-white/20">
      <Sidebar className="hidden md:flex" />
      <main className="md:pl-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-12 md:px-12 md:py-16">
          {children}
        </div>
      </main>
    </div>
  );
};
