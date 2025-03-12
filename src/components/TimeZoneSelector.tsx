
import { Command } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const TIMEZONES = Intl.supportedValuesOf("timeZone");

interface TimeZoneSelectorProps {
  onSelect: (timezone: string) => void;
  selectedTimezones: string[];
}

const TimeZoneSelector = ({ onSelect, selectedTimezones }: TimeZoneSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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
          <div className="max-h-[300px] overflow-auto">
            {TIMEZONES.map((timezone) => (
              <div
                key={timezone}
                className={cn(
                  "flex cursor-pointer items-center justify-between px-4 py-2 text-sm hover:bg-accent",
                  selectedTimezones.includes(timezone) && "opacity-50"
                )}
                onClick={() => {
                  if (!selectedTimezones.includes(timezone)) {
                    onSelect(timezone);
                    setOpen(false);
                  }
                }}
              >
                {timezone.replace(/_/g, " ")}
                {selectedTimezones.includes(timezone) && (
                  <Check className="h-4 w-4" />
                )}
              </div>
            ))}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TimeZoneSelector;
