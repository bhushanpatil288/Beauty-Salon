import { CalendarDays, Clock } from "lucide-react";
import { TIME_SLOTS } from "../../../constants/data";
import { isSlotAvailable } from "../../../utils/appointment-utils";

interface Props {
  date: string;
  time: string;
  minDate: string;
  selectedService: any;
  blockedRanges: any[];
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DateTimePicker({
  date,
  time,
  minDate,
  selectedService,
  blockedRanges,
  onDateChange,
  onTimeChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-primary" />
          Preferred Date
        </label>
        <input
          type="date"
          name="date"
          min={minDate}
          value={date}
          onChange={onDateChange}
          className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        />
      </div>

      {/* Time */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Preferred Time
        </label>
        <div className="relative">
          <select
            name="time"
            value={time}
            onChange={onTimeChange}
            className="flex h-12 w-full appearance-none rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <option value="" disabled>-- Select time --</option>
            {TIME_SLOTS.map((slot) => {
              const available = isSlotAvailable(slot, selectedService?.duration || 0, blockedRanges);
              return (
                <option key={slot} value={slot} disabled={!available}>
                  {slot}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
