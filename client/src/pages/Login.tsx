import Layout from "./Layout"
import { useState } from "react"

const Login = () => {
    const [formData, setFormData] = useState({
        phone: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
    }
    return (
        <Layout>
            <div className="flex justify-center items-center flex-grow py-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-primary">Login</h1>
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            autoComplete="current-password"
                            className="border border-gray-300 rounded-md px-2 py-1 text-primary"
                        />
                        <button type="submit" className="bg-primary text-secondary rounded-md px-2 py-1 cursor-pointer">Login</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login