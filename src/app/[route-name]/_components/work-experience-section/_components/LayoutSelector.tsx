import { Grid } from "lucide-react";
import { Layout, List } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LayoutStyle = "cards" | "list" | "grid";

export const LayoutSelector = ({
  layoutStyle,
  onLayoutChange,
}: {
  layoutStyle: string;
  onLayoutChange: (style: "cards" | "list" | "grid") => void;
}) => (
  <Select value={layoutStyle} onValueChange={onLayoutChange}>
    <SelectTrigger className="w-[140px]">
      <SelectValue placeholder="Select layout" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="cards">
        <span className="flex items-center gap-2">
          <Layout className="h-4 w-4" />
          Cards
        </span>
      </SelectItem>
      <SelectItem value="list">
        <span className="flex items-center gap-2">
          <List className="h-4 w-4" />
          List
        </span>
      </SelectItem>
      <SelectItem value="grid">
        <span className="flex items-center gap-2">
          <Grid className="h-4 w-4" />
          Grid
        </span>
      </SelectItem>
    </SelectContent>
  </Select>
);
