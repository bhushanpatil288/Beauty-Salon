import Navbar from "../components/CustomComponenents/Navbar/Navbar"
import Footer from "../components/CustomComponenents/Footer/Footer"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col mt-20">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout