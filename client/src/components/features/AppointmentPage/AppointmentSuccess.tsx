import { Sparkles } from "lucide-react";

export default function AppointmentSuccess() {
  return (
    <div className="text-center py-16 animate-in zoom-in duration-500">
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Appointment Confirmed!</h3>
      <p className="text-muted-foreground">We're looking forward to seeing you.</p>
      <p className="text-sm mt-4 text-muted-foreground">Redirecting...</p>
    </div>
  );
}
