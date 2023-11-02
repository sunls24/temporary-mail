import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectWrap({
  value,
  setValue,
  list,
  disabled,
}: {
  value: string;
  setValue: (v: string) => void;
  list: string[];
  disabled?: boolean;
}) {
  return (
    <Select disabled={disabled} value={value} onValueChange={setValue}>
      <SelectTrigger className="w-fit gap-1">
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
