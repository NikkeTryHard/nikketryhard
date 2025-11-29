import React from "react";
import { cn } from "../../lib/utils";

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex p-1 bg-zinc-900 rounded-lg border border-white/10 w-fit",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
            activeTab === tab.id
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
