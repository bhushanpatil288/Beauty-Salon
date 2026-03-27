import ServicesCard from "../services/ServicesCard";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { useServices } from "../../../context/ServicesContext";

const ServicesSection = () => {
    const { services, loading, error } = useServices();


    return (
        <section className="container mx-auto max-w-7xl py-16 px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gradient mb-4">Featured Services</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore some of our most popular beauty treatments.</p>
            </div>

            {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 max-w-md mx-auto mb-10 text-center">
                    <p className="text-destructive font-semibold">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : (
                    services.length !== 0 ? (
                        services.slice(0, 6).map((service: any) => (
                            <ServicesCard key={service._id} service={service} />
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20">
                            <p className="text-xl text-muted-foreground">No services currently available.</p>
                        </div>
                    )
                )}
            </div>

            {!loading && services.length > 0 && (
                <div className="mt-12 text-center">
                    <Link to="/services">
                        <Button variant="default" size="lg" className="rounded-full px-8 text-lg hover:shadow-lg transition-all cursor-pointer">
                            View All Services
                        </Button>
                    </Link>
                </div>
            )}
        </section>
    )
}

export default ServicesSection;
