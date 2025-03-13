
import { CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeZoneSearchItemProps {
  timezone: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

const TimeZoneSearchItem = ({
  timezone,
  isSelected,
  onSelect,
}: TimeZoneSearchItemProps) => {
  const formattedName = timezone.replace(/_/g, " ");
  
  return (
    <CommandItem
      value={timezone}
      onSelect={() => onSelect(timezone)}
      className={cn(
        "flex cursor-pointer items-center justify-between",
        isSelected && "opacity-50"
      )}
    >
      {formattedName}
      {isSelected && <Check className="h-4 w-4" />}
    </CommandItem>
  );
};

export default TimeZoneSearchItem;
