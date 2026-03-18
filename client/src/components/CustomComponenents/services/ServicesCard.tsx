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
        <Card size="lg" className="mx-auto w-full max-w-sm shadow">
            <CardHeader>
                <CardTitle className="font-bold text-2xl">{service.heading}</CardTitle>
                <CardDescription>
                    {service.subHeading}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    {service.description}
                </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <p className="text-start w-full font-semibold">Starting at ₹{service.price}</p>
                <Button variant="default" size="sm" className="w-full">
                    Book Now
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ServicesCard