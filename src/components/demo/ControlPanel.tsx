import React from "react";
import type { DitherProps } from "../Dither";

interface ControlPanelProps {
  values: Required<DitherProps>;
  onChange: (newValues: Required<DitherProps>) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  values,
  onChange,
}) => {
  const handleChange = (key: keyof DitherProps, value: any) => {
    onChange({ ...values, [key]: value });
  };

  const handleColorChange = (index: number, value: number) => {
    const newColor = [...values.waveColor] as [number, number, number];
    newColor[index] = value;
    handleChange("waveColor", newColor);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
          Wave Settings
        </h3>

        <ControlGroup label="Speed">
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.01"
            value={values.waveSpeed}
            onChange={(e) =>
              handleChange("waveSpeed", parseFloat(e.target.value))
            }
            className="w-full accent-white"
          />
          <span className="text-xs font-mono text-zinc-500 w-12 text-right">
            {values.waveSpeed.toFixed(2)}
          </span>
        </ControlGroup>

        <ControlGroup label="Frequency">
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={values.waveFrequency}
            onChange={(e) =>
              handleChange("waveFrequency", parseFloat(e.target.value))
            }
            className="w-full accent-white"
          />
          <span className="text-xs font-mono text-zinc-500 w-12 text-right">
            {values.waveFrequency.toFixed(1)}
          </span>
        </ControlGroup>

        <ControlGroup label="Amplitude">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={values.waveAmplitude}
            onChange={(e) =>
              handleChange("waveAmplitude", parseFloat(e.target.value))
            }
            className="w-full accent-white"
          />
          <span className="text-xs font-mono text-zinc-500 w-12 text-right">
            {values.waveAmplitude.toFixed(2)}
          </span>
        </ControlGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
          Appearance
        </h3>

        <ControlGroup label="Colors">
          <input
            type="range"
            min="2"
            max="16"
            step="1"
            value={values.colorNum}
            onChange={(e) => handleChange("colorNum", parseInt(e.target.value))}
            className="w-full accent-white"
          />
          <span className="text-xs font-mono text-zinc-500 w-12 text-right">
            {values.colorNum}
          </span>
        </ControlGroup>

        <ControlGroup label="Pixel Size">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={values.pixelSize}
            onChange={(e) =>
              handleChange("pixelSize", parseInt(e.target.value))
            }
            className="w-full accent-white"
          />
          <span className="text-xs font-mono text-zinc-500 w-12 text-right">
            {values.pixelSize}
          </span>
        </ControlGroup>

        <div className="space-y-2">
          <label className="text-xs text-zinc-400">Wave Color (RGB)</label>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={values.waveColor[i]}
                onChange={(e) =>
                  handleColorChange(i, parseFloat(e.target.value))
                }
                className="w-full bg-zinc-900 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-white/30"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
          Interaction
        </h3>

        <div className="flex items-center justify-between">
          <label className="text-xs text-zinc-400">Enable Mouse</label>
          <input
            type="checkbox"
            checked={values.enableMouseInteraction}
            onChange={(e) =>
              handleChange("enableMouseInteraction", e.target.checked)
            }
            className="accent-white"
          />
        </div>

        {values.enableMouseInteraction && (
          <ControlGroup label="Radius">
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={values.mouseRadius}
              onChange={(e) =>
                handleChange("mouseRadius", parseFloat(e.target.value))
              }
              className="w-full accent-white"
            />
            <span className="text-xs font-mono text-zinc-500 w-12 text-right">
              {values.mouseRadius.toFixed(2)}
            </span>
          </ControlGroup>
        )}
      </div>
    </div>
  );
};

const ControlGroup: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs text-zinc-400">{label}</label>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
};
