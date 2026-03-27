import AdminLayout from "../../components/layout/AdminLayout";
import { useAuth } from "../../context/AuthContext";
import AppointmentsTable from "../../components/dashboard/AppointmentsTable";

const AdminAppointments = () => {
    const { appointments } = useAuth();

    return (
        <AdminLayout title="Appointments" subtitle="Manage all salon appointments">
            <AppointmentsTable appointments={appointments} />
        </AdminLayout>
    );
};

export default AdminAppointments;
