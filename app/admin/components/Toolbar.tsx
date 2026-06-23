"use client";

import { RefreshCw } from "lucide-react";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import { Button } from "@/components/ui/Button";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  refresh: () => void;
}

export default function Toolbar({
  search,
  setSearch,
  status,
  setStatus,
  refresh,
}: Props) {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
      
      {/* Search component */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Filter and Action Buttons */}
      <div className="flex gap-3 items-stretch">
        <StatusFilter value={status} onChange={setStatus} />

        <Button
          onClick={refresh}
          variant="secondary"
          className="flex-shrink-0"
        >
          <RefreshCw size={14} className="text-slate-400" />
          <span>Refresh</span>
        </Button>
      </div>

    </div>
  );
}