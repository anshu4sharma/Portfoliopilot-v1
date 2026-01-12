import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { EducationLayout } from "../types";
export function EducationLayoutSelector({
    variant,
    onVariantChange,
}: {
    variant: EducationLayout;
    onVariantChange: (variant: EducationLayout) => void;
}) {
    return (
        <Select value={variant} onValueChange={onVariantChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="timeline">Timeline</SelectItem>
            </SelectContent>
        </Select>
    );
}
