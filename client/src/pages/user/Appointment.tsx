import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/PublicLayout";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchServices } from "../../features/services/servicesSlice";
import { createAppointment, getAppointmentsByDate } from "../../api/api";
import { getBlockedRanges } from "../../utils/appointment-utils";
import AppointmentHeader from "../../components/features/AppointmentPage/AppointmentHeader";
import AppointmentSuccess from "../../components/features/AppointmentPage/AppointmentSuccess";
import AppointmentForm from "../../components/features/AppointmentPage/AppointmentForm";
import { WHATSAPP_NUMBER } from "../../constants/data";

export default function Appointment() {
  const dispatch = useAppDispatch();
  const { list: services, loading: servicesLoading } = useAppSelector((s) => s.services);
  const navigate = useNavigate();

  useEffect(() => {
    if (services.length === 0) dispatch(fetchServices());
  }, [dispatch, services.length]);

  const [formData, setFormData] = useState({
    serviceId: "",
    date: "",
    time: "",
    notes: "",
    duration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [blockedRanges, setBlockedRanges] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);

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

      // WhatsApp Automatic Notification System 
      // This immediately requests the client's browser to open a WhatsApp tab with the predefined message to you.
      if (WHATSAPP_NUMBER) {
        const serviceName = selectedService?.heading || "a service";
        // Customize this text structure if needed. This matches your requested formatting!
        const message = `I booked appointment for ${serviceName} at ${formData.time}`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to book your appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (formData.serviceId && services.length > 0) {
      const service = services.find((s: any) => s._id === formData.serviceId);
      setFormData(prev => ({ ...prev, duration: String(service?.duration ?? "") }));
      setSelectedService(service);
    }

    if (formData.date) {
      getAppointmentsByDate(formData.date)
        .then((res) => {
          setBlockedRanges(getBlockedRanges(res.data?.data ?? res.data));
        })
        .catch(console.error);
    } else {
      setBlockedRanges([]);
    }
  }, [formData.serviceId, formData.date, services]);

  return (
    <Layout>
      <div className="container mx-auto overflow-hidden lg:overflow-visible max-w-2xl py-16 px-6 relative">
        <AppointmentHeader />

        <div className="glass shadow-xl rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden backdrop-blur-xl bg-card/60">
          {success ? (
            <AppointmentSuccess />
          ) : (
            <AppointmentForm
              formData={formData}
              services={services}
              servicesLoading={servicesLoading}
              isSubmitting={isSubmitting}
              error={error}
              minDate={minDate}
              selectedService={selectedService}
              blockedRanges={blockedRanges}
              onSubmit={handleSubmit}
              onChange={handleChange}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
