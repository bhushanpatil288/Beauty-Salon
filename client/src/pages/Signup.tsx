import { useState } from "react"
import Layout from "./Layout"

const Signup = () => {
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
        e.preventDefault()
        console.log(formData)
    }
    return (
        <Layout>
            <div className="flex justify-center items-center h-180">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-primary">Signup</h1>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <label htmlFor="name" className="text-primary">Name</label>
                        <input value={formData.name} onChange={handleChange} type="text" id="name" name="name" placeholder="Username" className="border border-gray-300 rounded-md px-2 py-1" />
                        <label htmlFor="phone" className="text-primary">Phone</label>
                        <input value={formData.phone} onChange={handleChange} type="number" id="phone" name="phone" placeholder="phone" className="border border-gray-300 rounded-md px-2 py-1" />
                        <label htmlFor="email" className="text-primary">Email</label>
                        <input value={formData.email} onChange={handleChange} type="email" id="email" name="email" placeholder="email" className="border border-gray-300 rounded-md px-2 py-1" />
                        <label htmlFor="password" className="text-primary">Password</label>
                        <input value={formData.password} onChange={handleChange} type="password" id="password" name="password" placeholder="password" className="border border-gray-300 rounded-md px-2 py-1" />
                        <button type="submit" className="bg-primary text-secondary rounded-md px-2 py-1 cursor-pointer">Signup</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Signup