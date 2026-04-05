import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/PublicLayout";
import { signup } from "../../api/api";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/auth/authSlice";
import useForm from "../../hooks/useForm";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [error, setError] = useState("");
    const { formData, handleChange, setFormData } = useForm({
        name: "",
        phone: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await signup(formData);
            dispatch(setUser(res.data.data.user));
            setFormData({ name: "", phone: "", email: "", password: "" });
            navigate("/services");
        } catch (err: any) {
            setError(err.response?.data?.message ?? "Signup failed");
            setTimeout(() => setError(""), 2000);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center flex-grow py-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-primary">Signup</h1>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <label htmlFor="name" className="text-primary">Name</label>
                        <input
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Username"
                            required
                            autoComplete="username"
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                        <label htmlFor="phone" className="text-primary">Phone</label>
                        <input
                            value={formData.phone}
                            onChange={handleChange}
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            required
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                        <label htmlFor="email" className="text-primary">Email</label>
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                        <label htmlFor="password" className="text-primary">Password</label>
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                        <button type="submit" className="bg-primary text-secondary rounded-md px-2 py-1 cursor-pointer">
                            Signup
                        </button>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
