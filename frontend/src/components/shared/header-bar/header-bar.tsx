'use client'
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import Hamburger from "hamburger-react";
import NavMenu from "@/components/shared/header-bar/nav-menu";
import { useAuth } from "@/context/auth-context";
import { navMenuData } from "@/components/shared/header-bar/nav-menu-routes";
import { useState } from "react";

function HeaderBar() {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
    const [navMenuIsOpen, setNavMenuIsOpen] = useState<boolean>(false);
    const { isAuthenticated } = useAuth();

    const unregisteredUserMenuData: typeof navMenuData = navMenuData.filter((item) => !item.requiresAuth);
    const registeredUserMenuData: typeof navMenuData = navMenuData.filter((item) => item.requiresAuth);
    const userMenu: typeof navMenuData = isAuthenticated ? registeredUserMenuData : unregisteredUserMenuData;

    function hamburgerClickHandler(): void {
        setNavMenuIsOpen(!navMenuIsOpen);
    }

    return (
        <div className="flex justify-between items-center h-[50px] bg-[#D5B4E9]/80 backdrop-blur-lg shadow-md p-8">
            <div className="flex flex-1">
                <h1 className="hidden md:block text-2xl cursor-pointer">
                    <Link href={isAuthenticated ? '/feed' : '/'}>NewsApp</Link>
                </h1>
                <div className="flex md:hidden hover:cursor-pointer hover:scale-110 ease-in duration-200 z-50">
                    <SearchIcon />
                </div>
            </div>
            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex">
                {userMenu.map((menuItem) => (
                    <ul className="px-4 cursor-pointer hover:scale-110 ease-in duration-200" key={menuItem.title}>
                        {menuItem.url ? <Link href={menuItem.url}>{menuItem.title}</Link> : <h1>{menuItem.title}</h1>}
                    </ul>
                ))}
            </div>
            {/* Mobile Navigation Menu */}
            <div className="flex md:hidden hover:scale-110 ease-in duration-200 z-50" onClick={hamburgerClickHandler}>
                <Hamburger size={22} toggled={isHamburgerOpen} toggle={setIsHamburgerOpen} />
            </div>
            {navMenuIsOpen && <NavMenu />}
        </div>
    );
}

export default HeaderBar;
