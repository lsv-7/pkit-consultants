"use client";

import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";

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
    <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <div className="flex gap-3">

        <StatusFilter
          value={status}
          onChange={setStatus}
        />

        <button
          onClick={refresh}
          className="bg-blue-600 hover:bg-blue-700 px-5 rounded-lg font-medium transition"
        >
          Refresh
        </button>

      </div>

    </div>
  );
}