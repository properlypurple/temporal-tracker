
import { Command, CommandInput, CommandList, CommandEmpty } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import TimeZoneSearchItem from "./TimeZoneSearchItem";
import { TIMEZONES, filterTimezones } from "@/lib/timezone-utils";

interface TimeZoneSelectorProps {
  onSelect: (timezone: string) => void;
  selectedTimezones: string[];
}

const TimeZoneSelector = ({ onSelect, selectedTimezones }: TimeZoneSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTimezones = filterTimezones(search, TIMEZONES);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between md:w-[300px]"
        >
          Select timezone...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[300px]">
        <Command>
          <CommandInput 
            placeholder="Search timezone, city or abbreviation..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No timezone found</CommandEmpty>
            {filteredTimezones.map((timezone) => (
              <TimeZoneSearchItem
                key={timezone}
                timezone={timezone}
                isSelected={selectedTimezones.includes(timezone)}
                onSelect={(value) => {
                  if (!selectedTimezones.includes(value)) {
                    onSelect(value);
                    setOpen(false);
                    setSearch("");
                  }
                }}
              />
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TimeZoneSelector;
