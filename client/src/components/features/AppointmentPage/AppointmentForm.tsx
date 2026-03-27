import type { SubmitEvent } from "react";
import { Button } from "../../ui/button";
import ServiceSelect from "./ServiceSelect";
import DateTimePicker from "./DateTimePicker";
import NotesField from "./NotesField";

interface FormData {
  serviceId: string;
  date: string;
  time: string;
  notes: string;
  duration: string;
}

interface Props {
  formData: FormData;
  services: any[];
  servicesLoading: boolean;
  isSubmitting: boolean;
  error: string;
  minDate: string;
  selectedService: any;
  blockedRanges: any[];
  onSubmit: (e: SubmitEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function AppointmentForm({
  formData,
  services,
  servicesLoading,
  isSubmitting,
  error,
  minDate,
  selectedService,
  blockedRanges,
  onSubmit,
  onChange,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium rounded-lg p-3 text-center">
          {error}
        </div>
      )}

      <ServiceSelect
        value={formData.serviceId}
        services={services}
        loading={servicesLoading}
        onChange={onChange}
      />

      <DateTimePicker
        date={formData.date}
        time={formData.time}
        minDate={minDate}
        selectedService={selectedService}
        blockedRanges={blockedRanges}
        onDateChange={onChange}
        onTimeChange={onChange}
      />

      <NotesField value={formData.notes} onChange={onChange} />

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || servicesLoading}
          className="w-full rounded-xl h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          {isSubmitting ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </form>
  );
}
