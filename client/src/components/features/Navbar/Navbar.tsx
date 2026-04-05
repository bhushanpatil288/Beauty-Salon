"use client"
import { useState } from "react";
import { services } from "../../../constants/data";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { clearUser } from "../../../features/auth/authSlice";
import { clearUserList } from "../../../features/appointments/appointmentsSlice";
import { logout } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { logo } from "../../../constants/data.images";

import * as React from "react"
import { Link } from "react-router-dom"
import { Menu, X, LogIn, LogOut, User, UserPlus } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu"
import { Button } from "../../ui/button";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    dispatch(clearUserList());
    navigate("/", { replace: true });
    setIsMobileMenuOpen(false);
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="bg-primary/10 backdrop-blur-md fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl rounded-2xl flex flex-col px-4 py-3 transition-all duration-300">
      <div className="flex justify-between items-center w-full">
        <Link to="/" onClick={closeMenu}>
          {/* <p className="text-xl font-bold text-primary">Pooja Beauty</p> */}
          <img src={logo} alt="" className="w-20 scale-150" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-md">Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-50">
                    <ListItem href="/introduction" title="Introduction">
                      How to use this site
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-md">Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {services.map((service) => (
                      <ListItem
                        key={service.title}
                        title={service.title}
                        href={service.href}
                      >
                        {service.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/about">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {user?.role === "admin" && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link to="/admin/dashboard">
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex justify-center items-center gap-3">
          <div className="flex gap-2">
            {user ?
              <>
                <Link to={"/profile"}>
                  <Button variant={"outline"} className="cursor-pointer hover:bg-secondary hover:text-primary transition-all">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant={"outline"} className="cursor-pointer hover:bg-secondary hover:text-primary transition-all" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
              :
              <>
                <Link to={"/signup"}>
                  <Button variant={"default"} size={"lg"} className="cursor-pointer hover:text-white transition-all">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Signup
                  </Button>
                </Link>
                <Link to={"/login"}>
                  <Button variant={"ghost"} size={"lg"} className="cursor-pointer hover:bg-secondary hover:text-primary transition-all">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              </>
            }
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-primary hover:bg-primary/10">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 pt-4 pb-2 border-t border-border/50 mt-3 animate-in fade-in slide-in-from-top-2">
          <Link to="/introduction" onClick={closeMenu} className="text-foreground hover:text-primary font-medium px-2 py-2 rounded-md hover:bg-secondary/50">
            Getting Started
          </Link>
          <Link to="/services" onClick={closeMenu} className="text-foreground hover:text-primary font-medium px-2 py-2 rounded-md hover:bg-secondary/50">
            Explore Services
          </Link>
          <Link to="/about" onClick={closeMenu} className="text-foreground hover:text-primary font-medium px-2 py-2 rounded-md hover:bg-secondary/50">
            About Us
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin/dashboard" onClick={closeMenu} className="text-foreground hover:text-primary font-medium px-2 py-2 rounded-md hover:bg-secondary/50">
              Dashboard
            </Link>
          )}

          <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-border/20">
            {user ?
              <>
                <Link to={"/profile"} onClick={closeMenu} className="w-full">
                  <Button variant={"outline"} className="w-full justify-start cursor-pointer hover:bg-secondary hover:text-primary transition-all">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant={"outline"} className="w-full justify-start cursor-pointer hover:bg-secondary hover:text-primary transition-all" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
              :
              <>
                <Link to={"/signup"} onClick={closeMenu} className="w-full">
                  <Button variant={"default"} className="w-full justify-start cursor-pointer hover:bg-secondary hover:text-primary transition-all">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Signup
                  </Button>
                </Link>
                <Link to={"/login"} onClick={closeMenu} className="w-full">
                  <Button variant={"outline"} className="w-full justify-start cursor-pointer hover:bg-secondary hover:text-primary transition-all">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              </>
            }
          </div>
        </div>
      )}
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}