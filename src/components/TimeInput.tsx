
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeInputProps {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}

const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const [date, setDate] = useState<Date | undefined>(value);
  const [time, setTime] = useState<string>(
    value ? format(value, "HH:mm") : ""
  );

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate && time) {
      const [hours, minutes] = time.split(":").map(Number);
      const dateTime = new Date(newDate);
      dateTime.setHours(hours, minutes, 0, 0);
      onChange(dateTime);
    } else if (!newDate) {
      onChange(undefined);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (newTime && date) {
      const [hours, minutes] = newTime.split(":").map(Number);
      const dateTime = new Date(date);
      dateTime.setHours(hours, minutes, 0, 0);
      onChange(dateTime);
    } else if (!newTime) {
      onChange(undefined);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="specific-time">Set specific date & time</Label>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left sm:w-[200px]",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        <Input
          id="specific-time"
          type="time"
          value={time}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="w-full sm:w-[150px]"
        />
      </div>
    </div>
  );
};

export default TimeInput;
