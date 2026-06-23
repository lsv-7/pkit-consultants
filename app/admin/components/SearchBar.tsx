"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <Input
      icon={<Search size={15} className="text-slate-500" />}
      type="text"
      placeholder="Search leads by name, email, company..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-96"
    />
  );
}