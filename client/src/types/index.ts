// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: "user" | "admin";
    createdAt: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────
export interface Service {
    _id: string;
    heading: string;
    subHeading: string;
    price: number;
    duration: number;
    description?: string;
}

// ─── Appointment ──────────────────────────────────────────────────────────────
export interface Appointment {
    _id: string;
    userId?: {
        _id: string;
        name: string;
        phone: string;
    };
    serviceId?: Service | string;
    date: string;
    time: string;
    duration?: number;
    status: "pending" | "booked" | "completed" | "cancelled";
    notes?: string;
    createdAt?: string;
}
