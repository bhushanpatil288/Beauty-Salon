import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card"
import { Button } from "../../ui/button"

type service = {
    heading: string,
    subHeading: string,
    description: string,
    price: string,
    duration: number
}

const ServicesCard = ({ service }: { service: service }) => {
    return (
        <Card className="h-full mx-auto w-full max-w-sm glass-card border-secondary/50 hover:shadow-2xl hover:border-primary/50 transition-all duration-500 group overflow-hidden relative flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
                <div>
                    <CardHeader>
                        <CardTitle className="font-bold text-2xl group-hover:text-primary transition-colors duration-300">
                            {service.heading}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground/80">
                            {service.subHeading}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/90 leading-relaxed">
                            {service.description}
                        </p>
                    </CardContent>
                </div>
                <CardFooter className="flex flex-col gap-4 mt-auto pt-6">
                    <div className="flex justify-between items-center w-full pb-4 border-b border-border/40">
                        <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Starting at</span>
                        <span className="font-bold text-2xl text-primary">₹{service.price}</span>
                    </div>
                    <Button variant="default" size="lg" className="w-full rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
                        Book Appointment
                    </Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default ServicesCard