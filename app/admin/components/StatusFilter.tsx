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
        bg-[#111827]
        border
        border-[#1E293B]
        text-slate-300
        text-sm
        focus:outline-none
        focus:border-[#2563EB]
        focus:ring-2
        focus:ring-[#2563EB]/20
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