import Navbar from "../components/CustomComponenents/Navbar/Navbar"
import Footer from "../components/CustomComponenents/Footer/Footer"

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout