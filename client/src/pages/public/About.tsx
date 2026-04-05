import Layout from "../../components/layout/PublicLayout";

const About = () => {
    return (
        <Layout>
            <div className="container mx-auto max-w-4xl py-24 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="glass p-10 md:p-16 rounded-3xl shadow-xl border border-secondary/50 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient mb-8">About Us</h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                        Welcome to our beauty parlour, where care and quality come first. Run by an experienced and dedicated professional, we provide a range of services including skincare, haircare, and grooming tailored to your needs. We focus on using good products and practical techniques to give you clean, reliable results. Whether it's regular maintenance or a special occasion, our goal is to help you look neat, confident, and well-groomed every time you visit.
                    </p>
                    <div className="mt-8 pt-8 border-t border-border/50">
                        <p className="text-xl font-medium text-primary italic">- Vandana Patil</p>
                        <p className="text-sm text-muted-foreground mt-1 uppercase tracking-widest">Founder &amp; Lead Stylist</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About
