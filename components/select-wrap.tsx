import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function SelectWrap({
  value,
  setValue,
  list,
  disabled,
  className,
}: {
  value: string;
  setValue: (v: string) => void;
  list: string[];
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Select disabled={disabled} value={value} onValueChange={setValue}>
      <SelectTrigger className={cn("w-fit gap-1", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {list.map((value, index) => (
          <SelectItem key={index} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectWrap;
