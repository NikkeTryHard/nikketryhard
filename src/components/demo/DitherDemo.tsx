import React, { useState } from "react";
import Dither, { type DitherProps } from "../Dither";
import { ControlPanel } from "./ControlPanel";
import { Tabs } from "../ui/Tabs";
import { CodeBlock } from "../ui/CodeBlock";
import { RotateCcw } from "lucide-react";

const defaultValues: Required<DitherProps> = {
  waveSpeed: 0.05,
  waveFrequency: 3,
  waveAmplitude: 0.3,
  waveColor: [0.5, 0.5, 0.5],
  colorNum: 4,
  pixelSize: 2,
  disableAnimation: false,
  enableMouseInteraction: true,
  mouseRadius: 0.3,
};

export const DitherDemo: React.FC = () => {
  const [values, setValues] = useState<Required<DitherProps>>(defaultValues);
  const [activeTab, setActiveTab] = useState("preview");

  const generateCode = () => {
    return `<Dither
  waveSpeed={${values.waveSpeed}}
  waveFrequency={${values.waveFrequency}}
  waveAmplitude={${values.waveAmplitude}}
  waveColor={[${values.waveColor.join(", ")}]}
  colorNum={${values.colorNum}}
  pixelSize={${values.pixelSize}}
  disableAnimation={${values.disableAnimation}}
  enableMouseInteraction={${values.enableMouseInteraction}}
  mouseRadius={${values.mouseRadius}}
/>`;
  };

  return (
    <div className="rounded-xl border border-white/10 bg-black overflow-hidden">
      <div className="border-b border-white/10 p-4 flex items-center justify-between bg-white/5">
        <Tabs
          tabs={[
            { id: "preview", label: "Preview" },
            { id: "code", label: "Code" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <button
          onClick={() => setValues(defaultValues)}
          className="p-2 text-zinc-400 hover:text-white transition-colors"
          title="Reset to defaults"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row h-[600px]">
        {/* Main Area */}
        <div className="flex-1 relative border-r border-white/10 bg-zinc-950/50">
          {activeTab === "preview" ? (
            <div className="absolute inset-0 overflow-hidden">
              <Dither {...values} />
            </div>
          ) : (
            <div className="p-6 h-full overflow-auto">
              <CodeBlock
                code={generateCode()}
                language="tsx"
                className="mt-0"
              />
            </div>
          )}
        </div>

        {/* Controls Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 bg-zinc-950 overflow-y-auto">
          <ControlPanel values={values} onChange={setValues} />
        </div>
      </div>
    </div>
  );
};
