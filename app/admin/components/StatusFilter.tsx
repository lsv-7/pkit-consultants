"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function StatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
      px-4
      py-3
      rounded-lg
      bg-slate-900
      border
      border-slate-700
      "
    >
      <option value="">All Status</option>

      <option value="NEW">
        New
      </option>

      <option value="CONTACTED">
        Contacted
      </option>

      <option value="COMPLETED">
        Completed
      </option>
    </select>
  );
}