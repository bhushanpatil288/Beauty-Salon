import { Button } from "../components/ui/button"
import Layout from "./Layout"
import { parlourImage } from "../constants/data.images";
import Image from "../components/CustomComponenents/common/Image";

const Home = () => {
  return (
    <Layout>
      <section className="hero-section">
        <div className="container mx-auto">
          <div className="flex py-5 flex-col lg:flex-row">

            <div className="w-full lg:w-1/2 p-5 py-20 text-center xl:text-start flex flex-col gap-5 justify-between">
              <div className="flex flex-col gap-4">
                <h1 className="text-primary text-5xl font-semibold">Pooja Beauty Parlour and <br /> Coaching Classes</h1>
                <p className="text-sm text-primary">Welcome to Pooja Beauty Parlour and Coaching Classes, where we believe that every woman deserves to feel confident and beautiful. Our team of experienced professionals is dedicated to providing you with the highest quality services in a warm and welcoming environment.</p>
              </div>
              <div>
                <Button size={"xxl"} className="cursor-pointer">Book Appointment</Button>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-5 text-center md:text-start flex flex-col gap-5">
              <Image src={parlourImage} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home