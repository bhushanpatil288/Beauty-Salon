import Layout from "./Layout"
import { useAuth } from "../context/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { User, Mail, Phone, ShieldCheck, CalendarDays } from "lucide-react"

const Profile = () => {
    const { user } = useAuth();
    
    if (!user) {
        return (
            <Layout>
                <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="container mx-auto max-w-2xl py-12 px-4">
                <Card className="shadow-sm border-secondary/50">
                    <CardHeader className="text-center pb-6">
                        <div className="w-24 h-24 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                            <span className="text-4xl font-semibold tracking-tight">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                        </div>
                        <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                        <CardDescription className="text-base mt-2 font-medium capitalize">
                            {user.role || 'Customer'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                <User className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                    <p className="text-base font-semibold">{user.name}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                <Mail className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                    <p className="text-base font-semibold">{user.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                <Phone className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                                    <p className="text-base font-semibold">{user.phone || 'Not provided'}</p>
                                </div>
                            </div>
                            
                            {user.role && (
                                <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Account Role</p>
                                        <p className="text-base font-semibold capitalize">{user.role}</p>
                                    </div>
                                </div>
                            )}

                            {user.createdAt && (
                                <div className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/20 border border-secondary/50">
                                    <CalendarDays className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                                        <p className="text-base font-semibold">
                                            {new Date(user.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}

export default Profile