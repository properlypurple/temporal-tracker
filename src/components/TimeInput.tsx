
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeInput = ({ value, onChange }: TimeInputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="specific-time">Set specific time</Label>
      <Input
        id="specific-time"
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-[200px]"
      />
    </div>
  );
};

export default TimeInput;
