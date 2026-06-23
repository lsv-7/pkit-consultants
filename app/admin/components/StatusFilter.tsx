"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function StatusFilter({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        px-4
        py-2.5
        rounded-lg
        bg-[#060F24]
        border
        border-[#0E204A]
        text-slate-300
        text-sm
        focus:outline-none
        focus:border-[#0066FF]
        focus:ring-2
        focus:ring-[#0066FF]/20
        transition-all
        duration-200
        cursor-pointer
        select-none
      "
    >
      <option value="">All Statuses</option>
      <option value="NEW">New</option>
      <option value="CONTACTED">Contacted</option>
      <option value="COMPLETED">Completed</option>
    </select>
  );
}