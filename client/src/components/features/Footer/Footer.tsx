import { Link } from "react-router-dom";
import { services, quickLinks, socialLinks } from "../../../constants/data";

const Footer = () => {
  return (
    <footer className="bg-primary/10 border-t border-primary/20 backdrop-blur-md container mx-auto rounded-t-3xl pt-16 pb-8 px-8 md:px-16 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl tracking-tight text-primary">Pooja Beauty Parlour</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Welcome to Pooja Beauty Parlour and Coaching Classes, where we believe that every woman deserves to feel confident and beautiful. Our experienced professionals provide the highest quality services in a warm, welcoming environment.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-6 text-foreground">Our Services</h3>
          <ul className="flex flex-col gap-3">
            {services.slice(0, 5).map((item, i) => (
              <Link to={item.href} key={i}>
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm font-medium">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-6 text-foreground">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((item, i) => (
              <li key={i} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm font-medium">
                <Link to={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-6 text-foreground">Connect</h3>
          <ul className="flex flex-col gap-3">
            {socialLinks.map((item, i) => {
              const Icon = item.icon as React.ElementType;
              return (
                <li key={i} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm font-medium">
                  <Link to={item.href} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Pooja Beauty Parlour. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
          <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer