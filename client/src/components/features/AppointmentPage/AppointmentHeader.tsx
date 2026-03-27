import { Sparkles } from "lucide-react";

export default function AppointmentHeader() {
  return (
    <>
      <div className="absolute top-0 right-0 -mr-20 -mt-10 opacity-10 pointer-events-none">
        <Sparkles className="w-64 h-64" />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient mb-4">
          Book an Appointment
        </h1>
        <p className="text-lg text-muted-foreground mx-auto">
          Schedule your beauty session with our experts. Let us take care of you.
        </p>
      </div>
    </>
  );
}
