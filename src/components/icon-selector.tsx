"use client";

import React, { useState, useCallback, useMemo } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as VscIcons from "react-icons/vsc";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as BiIcons from "react-icons/bi";
import * as Fa6Icons from "react-icons/fa6";
import * as TiIcons from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Combine all icon sets
export const allIcons = {
  ...FaIcons,
  ...MdIcons,
  ...AiIcons,
  ...BsIcons,
  ...GiIcons,
  ...RiIcons,
  ...SiIcons,
  ...IoIcons,
  ...Io5Icons,
  ...VscIcons,
  ...GrIcons,
  ...HiIcons,
  ...BiIcons,
  ...Fa6Icons,
  ...TiIcons,
};

export type IconKey = keyof typeof allIcons;

interface IconSelectorProps {
  onSelect: (iconName: IconKey) => void;
  defaultSearchValue?: string;
  className?: string;
}

export function IconSelector({
  onSelect,
  defaultSearchValue = "",
  className,
}: IconSelectorProps) {
  const [searchInput, setSearchInput] = useState<string>(defaultSearchValue);
  const debouncedSearch = useDebounce(searchInput, 300);

  const filteredIcons = useMemo(() => {
    if (debouncedSearch.length < 2) return [];

    return Object.keys(allIcons).filter((iconName) =>
      iconName.toLowerCase().includes(debouncedSearch.toLowerCase()),
    ) as IconKey[];
  }, [debouncedSearch]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    [],
  );

  const handleIconSelect = useCallback(
    (iconName: IconKey) => {
      onSelect(iconName);
    },
    [onSelect],
  );

  return (
    <div className={`rounded-md border p-4 shadow-lg ${className}`}>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search icons... (minimum 2 characters)"
          value={searchInput}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4"
        />
      </div>

      <div className="flex max-h-60 flex-wrap gap-2 overflow-y-auto">
        {debouncedSearch.length < 2 ? (
          <p className="w-full text-center text-muted-foreground">
            Type at least 2 characters to search icons
          </p>
        ) : filteredIcons.length === 0 ? (
          <p className="w-full text-center text-muted-foreground">
            No icons found
          </p>
        ) : (
          filteredIcons.map((iconName) => {
            const IconComponent = allIcons[iconName];
            return (
              <Button
                key={iconName}
                type="button"
                size="icon"
                variant="outline"
                onClick={() => handleIconSelect(iconName)}
                title={iconName}
                // className="transition-transform hover:scale-110 hover:border-primary"
              >
                {IconComponent && <IconComponent className="h-5 w-5" />}
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
}
