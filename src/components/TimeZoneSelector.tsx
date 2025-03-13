
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Map of abbreviations to timezones
const ABBREVIATION_TO_TIMEZONE = {
  "et": "America/New_York",
  "est": "America/New_York",
  "edt": "America/New_York",
  "ct": "America/Chicago",
  "cst": "America/Chicago",
  "cdt": "America/Chicago",
  "mt": "America/Denver",
  "mst": "America/Denver",
  "mdt": "America/Denver",
  "pt": "America/Los_Angeles",
  "pst": "America/Los_Angeles",
  "pdt": "America/Los_Angeles",
  "ist": "Asia/Kolkata",
  "jst": "Asia/Tokyo",
  "gmt": "UTC",
  "utc": "UTC",
  "cet": "Europe/Paris",
  "bst": "Europe/London",
  "aest": "Australia/Sydney",
  "aedt": "Australia/Sydney",
  "nzst": "Pacific/Auckland",
  "nzdt": "Pacific/Auckland"
};

// Display names for common timezones
const TIMEZONE_DISPLAY_NAMES: Record<string, string> = {
  "America/New_York": "Eastern Time (ET)",
  "America/Chicago": "Central Time (CT)",
  "America/Denver": "Mountain Time (MT)",
  "America/Los_Angeles": "Pacific Time (PT)",
  "Asia/Kolkata": "India Standard Time (IST)",
  "Asia/Tokyo": "Japan Standard Time (JST)",
  "UTC": "Coordinated Universal Time (UTC)",
  "Europe/Paris": "Central European Time (CET)",
  "Europe/London": "British Summer Time (BST)",
  "Australia/Sydney": "Australian Eastern Time (AEST/AEDT)",
  "Pacific/Auckland": "New Zealand Time (NZST/NZDT)"
};

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
    
    // If search is empty, show all timezones
    if (!searchLower) return true;
    
    // Check if timezone name matches the search
    if (timezone.toLowerCase().replace(/_/g, " ").includes(searchLower)) {
      return true;
    }
    
    // Check if the display name (if available) matches the search
    if (TIMEZONE_DISPLAY_NAMES[timezone]?.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Check if the search term matches any abbreviation that maps to this timezone
    return Object.entries(ABBREVIATION_TO_TIMEZONE).some(([abbr, tz]) => 
      abbr.includes(searchLower) && tz === timezone
    );
  });

  const getTimezoneDisplayName = (timezone: string): string => {
    return TIMEZONE_DISPLAY_NAMES[timezone] || timezone.replace(/_/g, " ");
  };

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
            placeholder="Search timezone or abbreviation (ET, IST, etc)..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {filteredTimezones.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No timezone found.
              </p>
            )}
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
                {getTimezoneDisplayName(timezone)}
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
