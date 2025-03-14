import React, { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
// import logo from "../assets/logo.png"
import logo from "../assets/logo2.svg"
import logoDark from "../assets/logo-on-dark.svg"

export default function SiteNav() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=> {
        setIsOpen(false)
    },[location])

    return (
        <nav className="relative text-white p-4 w-full dark:bg-cyan-950 bg-cyan-50 backdrop-invert backdrop-opacity-10">
            <div className="container mx-auto flex items-center justify-between md:justify-normal">
                <button className="contents" onClick={() => navigate("/")}>
                    <img className="max-w-2/3 max-h-12 hidden dark:block" src={logoDark} />
                    <img className="max-w-2/3 max-h-12 block dark:hidden" src={logo} />
                </button>
                {/* Menu Items */}
                <div
                    className={`
                    absolute top-0 left-0 z-100 p-4 md:static bg-cyan-950 md:bg-transparent
                    lg:flex lg:items-center lg:space-x-6 w-full lg:w-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 uppercase font-bold 
                    ${isOpen ? "block" : "hidden"}`}
                >
                    <Link className="py-2 px-4 rounded-md hover:bg-cyan-200" to={"/"}>
                        Games
                    </Link>
                    {/* <Link to={'/games'}>Games</Link> */}
                    <Link className="py-2 px-4 rounded-md hover:bg-cyan-200" to={"/roster"}>
                        Roster
                    </Link>
                </div>

                {/* Hamburger Icon */}
                <div className="lg:hidden ml-auto relative z-100">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
        </nav>
    )
}
