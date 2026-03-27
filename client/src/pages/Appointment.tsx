import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useServices } from "../context/ServicesContext";
import { createAppointment, getAppointmentsByDate } from "../api/api";
import { getBlockedRanges } from "../utils/appointment-utils";
import AppointmentHeader from "../components/features/AppointmentPage/AppointmentHeader";
import AppointmentSuccess from "../components/features/AppointmentPage/AppointmentSuccess";
import AppointmentForm from "../components/features/AppointmentPage/AppointmentForm";

export default function Appointment() {
  const { services, loading: servicesLoading } = useServices();
  const navigate = useNavigate();

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
      setFormData(prev => ({ ...prev, duration: service?.duration || "" }));
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