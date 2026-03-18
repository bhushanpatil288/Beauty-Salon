import { HeroSection, ServicesSection } from "../components/CustomComponenents/HomePage"
import Layout from "./Layout"


const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
    </Layout>
  )
}

export default Home