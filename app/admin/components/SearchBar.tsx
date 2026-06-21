"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search by name, email, company or phone..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
      w-full
      md:w-96
      px-4
      py-3
      rounded-lg
      bg-slate-900
      border
      border-slate-700
      focus:outline-none
      focus:border-blue-500
      "
    />
  );
}