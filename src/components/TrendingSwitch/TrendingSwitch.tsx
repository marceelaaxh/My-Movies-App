"use client";

import React from "react";

type Props = {
  selected: "day" | "week";
  onChange: (value: "day" | "week") => void;
};

const TrendingSwitch: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <h2 className="text-2xl font-bold">🔥 Trending</h2>
      <div className="flex border border-blue-900 rounded-full overflow-hidden text-sm font-semibold">
        <button
          onClick={() => onChange("day")}
          className={`px-4 py-1 transition ${
            selected === "day"
              ? "bg-blue-900 text-green-300"
              : "text-blue-900 bg-white"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => onChange("week")}
          className={`px-4 py-1 transition ${
            selected === "week"
              ? "bg-blue-900 text-green-300"
              : "text-blue-900 bg-white"
          }`}
        >
          This Week
        </button>
      </div>
    </div>
  );
};

export default TrendingSwitch;