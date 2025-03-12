
import { useEffect, useState } from "react";
import TimeZoneCard from "@/components/TimeZoneCard";
import TimeZoneSelector from "@/components/TimeZoneSelector";
import TimeInput from "@/components/TimeInput";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedTimezones");
    return saved ? JSON.parse(saved) : ["Asia/Kolkata"];
  });
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [specificTime, setSpecificTime] = useState<Date | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedTimezones", JSON.stringify(selectedTimezones));
  }, [selectedTimezones]);

  const handleAddTimezone = (timezone: string) => {
    if (selectedTimezones.includes(timezone)) {
      toast({
        title: "Timezone already added",
        variant: "destructive",
      });
      return;
    }
    setSelectedTimezones((prev) => [...prev, timezone]);
    toast({
      title: "Timezone added",
      description: timezone.replace(/_/g, " "),
    });
  };

  const handleDeleteTimezone = (timezone: string) => {
    setSelectedTimezones((prev) => prev.filter((t) => t !== timezone));
    toast({
      title: "Timezone removed",
      description: timezone.replace(/_/g, " "),
    });
  };

  const handleTimeInput = (value: Date | undefined) => {
    setSpecificTime(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-light tracking-tight">World Clock</h1>
            <p className="text-muted-foreground">Track time across different timezones</p>
          </div>
          
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <TimeZoneSelector
              onSelect={handleAddTimezone}
              selectedTimezones={selectedTimezones}
            />
            <TimeInput
              value={specificTime}
              onChange={handleTimeInput}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedTimezones.map((timezone) => (
              <TimeZoneCard
                key={timezone}
                timezone={timezone}
                currentTime={currentTime}
                specificTime={specificTime}
                onDelete={handleDeleteTimezone}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
