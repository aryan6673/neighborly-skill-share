
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SessionSchedulerProps {
  userName: string;
  skillName: string;
  onSchedule: (date: Date, time: string, location: string) => void;
}

const SessionScheduler = ({
  userName,
  skillName,
  onSchedule,
}: SessionSchedulerProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSchedule = () => {
    if (date && time && location) {
      onSchedule(date, time, location);
    }
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Session with {userName}</CardTitle>
        <p className="text-muted-foreground">
          For: {skillName}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md mx-auto"
            disabled={(date) => {
              // Disable dates in the past
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Select
            value={time}
            onValueChange={setTime}
          >
            <SelectTrigger id="time">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter meeting location or online link"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSchedule}
          disabled={!date || !time || !location}
          className="w-full"
        >
          Schedule Session
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SessionScheduler;
