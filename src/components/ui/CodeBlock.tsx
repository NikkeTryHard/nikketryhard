import React from "react";
import { cn } from "../../lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
}

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, code, language = "typescript", ...props }, ref) => {
    return (
      <div className="relative rounded-lg bg-zinc-950 border border-white/10 overflow-hidden my-4">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <span className="text-xs text-zinc-400 font-mono">{language}</span>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre
            ref={ref}
            className={cn("text-sm font-mono text-zinc-300", className)}
            {...props}
          >
            <code>{code}</code>
          </pre>
        </div>
      </div>
    );
  }
);
CodeBlock.displayName = "CodeBlock";
