import React from "react";
import { Github, Command } from "lucide-react";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/utils";

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-white/10 flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-white">
          <div className="p-1 bg-white text-black rounded-md">
            <Command size={16} />
          </div>
          <span>React Bits</span>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <Github size={20} />
        </a>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {/* Getting Started */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">
            Getting Started
          </h3>
          <div className="space-y-1">
            <NavItem active>Introduction</NavItem>
            <NavItem>Installation</NavItem>
            <NavItem>MCP</NavItem>
            <NavItem>Index</NavItem>
          </div>
        </div>

        {/* Components */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">
            Components
          </h3>
          <div className="space-y-1">
            <NavItem>
              Animated Text{" "}
              <Badge variant="secondary" className="ml-auto text-[10px] h-5">
                New
              </Badge>
            </NavItem>
            <NavItem>
              Backgrounds{" "}
              <Badge variant="secondary" className="ml-auto text-[10px] h-5">
                Updated
              </Badge>
            </NavItem>
            <NavItem>Animations</NavItem>
            <NavItem>Components</NavItem>
          </div>
        </div>
      </div>
    </aside>
  );
};

const NavItem: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  href?: string;
}> = ({ children, active, href = "#" }) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
        active
          ? "bg-white/10 text-white"
          : "text-zinc-400 hover:text-white hover:bg-white/5"
      )}
    >
      {children}
    </a>
  );
};
