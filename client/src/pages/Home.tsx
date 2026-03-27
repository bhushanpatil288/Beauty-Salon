import { HeroSection, ServicesSection } from "../components/features/HomePage"
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