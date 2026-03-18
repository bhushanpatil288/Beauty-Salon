import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "./Layout"
import { signup } from "../api/api"
import { useAuth } from "../context/AuthContext"

const Signup = () => {
    const navigate = useNavigate();
    const { setUser, setToken } = useAuth();
    const [error, setError] = useState({} as any);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (async () => {
            try {
                const res = await signup(formData);
                setUser(res.data.user);
                setToken(res.data.token);
                navigate("/services");
                setError({});
                setFormData({ name: "", phone: "", email: "", password: "" })
            } catch (error: any) {
                if (error.response.status === 409) {
                    setError({ ...error, userExists: "User Already Exists" })
                }
                console.log(error.response.status)
            }
        })()
    }
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
                            placeholder="phone"
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
                            placeholder="email"
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                        <label htmlFor="password" className="text-primary">Password</label>
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            autoComplete="current-password"
                            required
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                        <button type="submit" className="bg-primary text-secondary rounded-md px-2 py-1 cursor-pointer">Signup</button>
                        {error.userExists && <p className="text-red-500 text-center">{error.userExists}</p>}
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Signup