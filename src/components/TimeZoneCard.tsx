import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { X, Sun, Moon, MoonStar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { differenceInMinutes } from "date-fns";

interface TimeZoneCardProps {
  timezone: string;
  currentTime: Date;
  specificTime?: Date;
  onDelete: (timezone: string) => void;
  defaultTimezone: string;
}

const TimeZoneCard = ({ 
  timezone, 
  currentTime, 
  specificTime, 
  onDelete,
  defaultTimezone 
}: TimeZoneCardProps) => {
  const time = specificTime || currentTime;
  
  // Determine if it's day or night
  const hour = parseInt(formatInTimeZone(time, timezone, "HH"));
  const isDaytime = hour >= 6 && hour < 18;
  
  // Calculate time difference with default timezone
  const zonedTime = toZonedTime(time, timezone);
  const defaultZonedTime = toZonedTime(time, defaultTimezone);
  const diffInMinutes = differenceInMinutes(zonedTime, defaultZonedTime);
  
  const hoursDiff = Math.floor(Math.abs(diffInMinutes) / 60);
  const minutesDiff = Math.abs(diffInMinutes) % 60;
  const diffString = `${diffInMinutes >= 0 ? '+' : '-'}${hoursDiff}:${minutesDiff.toString().padStart(2, '0')}`;
  
  return (
    <Card className="relative p-6 backdrop-blur-sm bg-card/90 transition-all duration-300 hover:shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-50 hover:opacity-100"
        onClick={() => onDelete(timezone)}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{timezone.replace(/_/g, " ")}</p>
        <p className="text-3xl font-light tracking-tight text-amber-950 dark:text-amber-100">
          {formatInTimeZone(time, timezone, "HH:mm")}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatInTimeZone(time, timezone, "EEEE, MMM d")}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>
              {diffString} from {defaultTimezone.split("/").pop()?.replace(/_/g, " ")}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {isDaytime ? (
              <Sun className="h-4 w-4 text-amber-500" />
            ) : (
              <MoonStar className="h-4 w-4 text-indigo-400" />
            )}
            <span>{isDaytime ? 'Day' : 'Night'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimeZoneCard;
