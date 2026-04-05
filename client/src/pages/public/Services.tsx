import Layout from "../../components/layout/PublicLayout";
import ServicesCard from "../../components/features/services/ServicesCard";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchServices } from "../../features/services/servicesSlice";
import { useEffect } from "react";

const Services = () => {
    const dispatch = useAppDispatch();
    const { list: services, loading, error } = useAppSelector((s) => s.services);

    useEffect(() => {
        if (services.length === 0) dispatch(fetchServices());
    }, [dispatch, services.length]);

    return (
        <Layout>
            <section className="container mx-auto max-w-7xl py-24 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient mb-4">Our Services</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover our range of premium beauty treatments carefully designed to make you look and feel your absolute best.</p>
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 max-w-md mx-auto mb-10 text-center">
                        <p className="text-destructive font-semibold">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ?
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        </div>
                        :
                        services.length !== 0 ?
                            services.map((service) => (
                                <ServicesCard key={service._id} service={service} />
                            ))
                            :
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20">
                                <p className="text-xl text-muted-foreground">No services currently available.</p>
                            </div>
                    }
                </div>
            </section>
        </Layout>
    )
}

export default Services
