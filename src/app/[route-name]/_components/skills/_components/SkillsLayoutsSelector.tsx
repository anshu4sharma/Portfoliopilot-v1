import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { VariantType } from "..";

export function SkillsLayoutsSelector({
  variant,
  onVariantChange,
}: {
  variant: VariantType;
  onVariantChange: (variant: VariantType) => void;
}) {
  return (
    <Select value={variant} onValueChange={onVariantChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select view" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="grid">Grid</SelectItem>
        <SelectItem value="list">List</SelectItem>
        <SelectItem value="compact">Compact</SelectItem>
      </SelectContent>
    </Select>
  );
}
