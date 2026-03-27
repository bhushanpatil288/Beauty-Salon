import { Sparkles } from "lucide-react";

interface Props {
  value: string;
  services: any[];
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ServiceSelect({ value, services, loading, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        Select Service
      </label>
      <div className="relative">
        <select
          name="serviceId"
          value={value}
          onChange={onChange}
          disabled={loading}
          className="flex h-12 w-full appearance-none rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled>
            {loading ? "Loading services..." : "-- Choose a service --"}
          </option>
          {services.map((service: any) => (
            <option key={service._id} value={service._id}>
              {service.heading} - ${service.price}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
