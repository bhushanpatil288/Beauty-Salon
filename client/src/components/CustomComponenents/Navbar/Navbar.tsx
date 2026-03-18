"use client"
import { services } from "../../../constants/data";
import { scissorImg } from "../../../constants/data.images";
import { useAuth } from "../../../context/AuthContext";
import { logout } from "../../../api/api";
import { useNavigate } from "react-router-dom";

import * as React from "react"
import { Link } from "react-router-dom"
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
  const { user, setUser, token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
  }
  return (
    <div className="bg-primary fixed top-2 left-1/2 -translate-x-1/2 z-10 container rounded-xl text-secondary flex justify-between items-center px-3 py-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-50">
                <ListItem href="/introduction" title="Introduction">
                  How to use this site
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:flex">
            <NavigationMenuTrigger>Explore Services</NavigationMenuTrigger>
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
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex justify-center items-center gap-3">
        <div className="flex gap-1">
          {user ?
            <>
              <Link to={"/profile"}>
                <Button variant={"outline"} className="cursor-pointer hover:bg-secondary hover:text-primary">
                  Profile
                </Button>
              </Link>
              <Button variant={"outline"} className="cursor-pointer hover:bg-secondary hover:text-primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
            :
            <>
              <Link to={"/signup"}>
                <Button variant={"outline"} className="cursor-pointer hover:bg-secondary hover:text-primary">
                  Signup
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button variant={"outline"} className="cursor-pointer hover:bg-secondary hover:text-primary">
                  Login
                </Button>
              </Link>
            </>
          }
        </div>
        <Link to="/">
          <img src={scissorImg} alt="" width="30" className="invert" />
        </Link>
      </div>
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