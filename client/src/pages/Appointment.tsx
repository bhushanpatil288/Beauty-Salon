import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useServices } from "../context/ServicesContext";
import { Button } from "../components/ui/button";
import { createAppointment } from "../api/api";
import { CalendarDays, Clock, FileText, Sparkles } from "lucide-react";

export default function Appointment() {
  const { services, loading: servicesLoading } = useServices();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceId: "",
    date: "",
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Get tomorrow's date for minimum valid date selection
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!formData.serviceId || !formData.date || !formData.time) {
      setError("Please select a service, date, and time.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      await createAppointment(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/profile"); // appointments will be shown in profile later
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to book your appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto overflow-hidden lg:overflow-visible max-w-2xl py-16 px-6 relative">
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

        <div className="glass shadow-xl rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden backdrop-blur-xl bg-card/60">
          {success ? (
            <div className="text-center py-16 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Appointment Confirmed!</h3>
              <p className="text-muted-foreground">We're looking forward to seeing you.</p>
              <p className="text-sm mt-4 text-muted-foreground">Redirecting...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium rounded-lg p-3 text-center">
                  {error}
                </div>
              )}

              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Select Service
                </label>
                <div className="relative">
                  <select
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    disabled={servicesLoading}
                    className="flex h-12 w-full appearance-none rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>
                      {servicesLoading ? "Loading services..." : "-- Choose a service --"}
                    </option>
                    {services.map((service: any) => (
                      <option key={service._id} value={service._id}>
                        {service.heading} - ${service.price}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={minDate}
                    value={formData.date}
                    onChange={handleChange}
                    className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Preferred Time
                  </label>
                  <div className="relative">
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="flex h-12 w-full appearance-none rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <option value="" disabled>-- Select time --</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about any special requests or skin conditions..."
                  className="flex min-h-[100px] w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
              </div>

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
          )}
        </div>
      </div>
    </Layout>
  );
}