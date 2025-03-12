
import { formatInTimeZone } from "date-fns-tz";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TimeZoneCardProps {
  timezone: string;
  currentTime: Date;
  specificTime?: Date;
  onDelete: (timezone: string) => void;
}

const TimeZoneCard = ({ timezone, currentTime, specificTime, onDelete }: TimeZoneCardProps) => {
  const time = specificTime || currentTime;
  
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
        <p className="text-3xl font-light tracking-tight">
          {formatInTimeZone(time, timezone, "HH:mm")}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatInTimeZone(time, timezone, "EEEE, MMM d")}
        </p>
      </div>
    </Card>
  );
};

export default TimeZoneCard;
