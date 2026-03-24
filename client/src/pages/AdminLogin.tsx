import Layout from "./Layout";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/api";

const AdminLogin = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        phone: "",
        secretKey: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await adminLogin(formData);
            setUser(response.data.user)
            navigate("/")
        } catch (e: any) {
            setError(e.response.data.message);
            setTimeout(() => {
                setError("");
            }, 2000);
        }
    }
    return (
        <Layout>
            <div className="flex justify-center items-center flex-grow py-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <input
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="phone"
                            className="border border-gray-300 rounded-md px-2 py-1 text-primary"
                        />

                        <input
                            type="password"
                            name="secretKey"
                            value={formData.secretKey}
                            onChange={handleChange}
                            placeholder="Secret Key"
                            required
                            className="border border-gray-300 rounded-md px-2 py-1 text-primary"
                        />

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            autoComplete="current-password"
                            className="border border-gray-300 rounded-md px-2 py-1 text-primary"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" className="bg-primary text-secondary rounded-md px-2 py-1 cursor-pointer">Login</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default AdminLogin