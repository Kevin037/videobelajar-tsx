import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/Elements/card";
import { FilterOption } from "@/services/types";

export const FilterSection: React.FC<FilterOption> = ({ title, options, name, onChange }) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);

  return (
    <Card>
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full font-semibold text-green-600"
      >
        {title}
        <ChevronDown
            className={`w-4 h-4 transition-transform ${
                open ? "rotate-180" : ""
            }`}
        />
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                className="accent-green-500"
                onChange={onChange}
              />
              {option.name}
            </label>
          ))}
        </div>
      )}
    </Card>
  );
};