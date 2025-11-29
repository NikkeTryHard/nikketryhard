import React from "react";

export interface PropDefinition {
  prop: string;
  type: string;
  default: string;
  description: string;
}

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 my-6">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-zinc-200">
          <tr>
            <th className="px-4 py-3 font-medium border-b border-white/10">
              Prop
            </th>
            <th className="px-4 py-3 font-medium border-b border-white/10">
              Type
            </th>
            <th className="px-4 py-3 font-medium border-b border-white/10">
              Default
            </th>
            <th className="px-4 py-3 font-medium border-b border-white/10">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {props.map((item) => (
            <tr key={item.prop} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 font-mono text-blue-400">{item.prop}</td>
              <td className="px-4 py-3 font-mono text-purple-400">
                {item.type}
              </td>
              <td className="px-4 py-3 font-mono text-zinc-400">
                {item.default}
              </td>
              <td className="px-4 py-3 text-zinc-300">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
