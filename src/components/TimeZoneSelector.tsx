
import { Command, CommandInput } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Define a list of common timezones as a fallback
const TIMEZONES = [
  "UTC",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Africa/Lagos",
  "America/Anchorage",
  "America/Bogota",
  "America/Chicago",
  "America/Denver",
  "America/Halifax",
  "America/Los_Angeles",
  "America/Mexico_City",
  "America/New_York",
  "America/Phoenix",
  "America/Santiago",
  "America/Sao_Paulo",
  "America/Toronto",
  "America/Vancouver",
  "Asia/Bangkok",
  "Asia/Dubai",
  "Asia/Hong_Kong",
  "Asia/Jakarta",
  "Asia/Jerusalem",
  "Asia/Kolkata",
  "Asia/Manila",
  "Asia/Seoul",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Adelaide",
  "Australia/Brisbane",
  "Australia/Melbourne",
  "Australia/Perth",
  "Australia/Sydney",
  "Europe/Amsterdam",
  "Europe/Athens",
  "Europe/Berlin",
  "Europe/Dublin",
  "Europe/Istanbul",
  "Europe/London",
  "Europe/Madrid",
  "Europe/Moscow",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Rome",
  "Europe/Stockholm",
  "Europe/Vienna",
  "Europe/Zurich",
  "Pacific/Auckland",
  "Pacific/Fiji",
  "Pacific/Honolulu"
];

interface TimeZoneSelectorProps {
  onSelect: (timezone: string) => void;
  selectedTimezones: string[];
}

const TimeZoneSelector = ({ onSelect, selectedTimezones }: TimeZoneSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTimezones = TIMEZONES.filter((timezone) =>
    timezone.toLowerCase().replace(/_/g, " ").includes(search.toLowerCase())
  );

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
            placeholder="Search timezone..." 
            value={search}
            onValueChange={setSearch}
          />
          <div className="max-h-[300px] overflow-auto">
            {filteredTimezones.map((timezone) => (
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
                    setSearch("");
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
