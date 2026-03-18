// import { parlourImage } from "../constants/data.images";
// import Image from "../components/CustomComponenents/common/Image";
import { MousePointerClick } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button"

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="container mx-auto">
                <div className="flex py-12 flex-col lg:flex-row justify-center">

                    <div className="w-full lg:w-1/2 p-5 py-20  text-center flex flex-col gap-8 justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex flex-col gap-6">
                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gradient pb-2">
                                Pooja Beauty Parlour <br /> & Coaching Classes
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                Welcome to Pooja Beauty Parlour, where we believe every woman deserves to feel confident and beautiful. Experience premium services in a warm, welcoming environment.
                            </p>
                        </div>
                        <div className="flex justify-center gap-4 flex-col md:flex-row">
                            <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all h-14 px-8 text-lg cursor-pointer">
                                Book Appointment
                                <MousePointerClick className="ml-2 w-5 h-5" />
                            </Button>
                            <Link to="/services">
                                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg glass cursor-pointer w-full">
                                    View Services
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* <div className="w-full lg:w-1/2 p-5 text-center md:text-start flex flex-col gap-5">
              <Image src={parlourImage} />
            </div> */}
                </div>
            </div>
        </section>
    )
}

export default HeroSection