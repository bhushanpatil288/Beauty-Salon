import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Footer/Footer";
import type { ReactNode } from "react";

interface PublicLayoutProps {
    children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex flex-col mt-20">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default PublicLayout;
