
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Mapping of common abbreviations to their corresponding timezones
const TIMEZONE_ABBREVIATIONS: Record<string, string[]> = {
  // North America
  "et": ["America/New_York"],
  "est": ["America/New_York"],
  "edt": ["America/New_York"],
  "ct": ["America/Chicago"],
  "cst": ["America/Chicago"],
  "cdt": ["America/Chicago"],
  "mt": ["America/Denver"],
  "mst": ["America/Denver"],
  "mdt": ["America/Denver"],
  "pt": ["America/Los_Angeles"],
  "pst": ["America/Los_Angeles"],
  "pdt": ["America/Los_Angeles"],
  "at": ["America/Halifax"],
  "ast": ["America/Halifax"],
  "adt": ["America/Halifax"],
  // Europe
  "gmt": ["Europe/London"],
  "bst": ["Europe/London"],
  "cet": ["Europe/Paris", "Europe/Berlin", "Europe/Rome"],
  "cest": ["Europe/Paris", "Europe/Berlin", "Europe/Rome"],
  "eet": ["Europe/Athens"],
  "eest": ["Europe/Athens"],
  // Asia
  "ist": ["Asia/Kolkata"],
  "jst": ["Asia/Tokyo"],
  "chn": ["Asia/Shanghai"], // Changed from "cst" to "chn" to avoid duplicate key
  // Australia
  "aest": ["Australia/Sydney"],
  "aedt": ["Australia/Sydney"],
  "awst": ["Australia/Perth"],
  // Common names
  "london": ["Europe/London"],
  "paris": ["Europe/Paris"],
  "new york": ["America/New_York"],
  "los angeles": ["America/Los_Angeles"],
  "tokyo": ["Asia/Tokyo"],
  "sydney": ["Australia/Sydney"],
  "india": ["Asia/Kolkata"],
  "mumbai": ["Asia/Kolkata"],
  "delhi": ["Asia/Kolkata"],
};

// Full list of available timezones
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

  const filteredTimezones = TIMEZONES.filter((timezone) => {
    const searchLower = search.toLowerCase();
    
    // Check if the search matches the timezone directly
    if (timezone.toLowerCase().replace(/_/g, " ").includes(searchLower)) {
      return true;
    }
    
    // Check if the search matches any abbreviation
    const matchingAbbreviations = Object.entries(TIMEZONE_ABBREVIATIONS)
      .filter(([abbr]) => abbr.includes(searchLower))
      .flatMap(([, timezones]) => timezones);
      
    if (matchingAbbreviations.includes(timezone)) {
      return true;
    }
    
    // Check if the search is an exact abbreviation that maps to this timezone
    return Object.entries(TIMEZONE_ABBREVIATIONS)
      .some(([abbr, timezones]) => 
        abbr === searchLower && timezones.includes(timezone)
      );
  });

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
              <CommandItem
                key={timezone}
                value={timezone}
                onSelect={() => {
                  if (!selectedTimezones.includes(timezone)) {
                    onSelect(timezone);
                    setOpen(false);
                    setSearch("");
                  }
                }}
                className={cn(
                  "flex cursor-pointer items-center justify-between",
                  selectedTimezones.includes(timezone) && "opacity-50"
                )}
              >
                {timezone.replace(/_/g, " ")}
                {selectedTimezones.includes(timezone) && (
                  <Check className="h-4 w-4" />
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TimeZoneSelector;
