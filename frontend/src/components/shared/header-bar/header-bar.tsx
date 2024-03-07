'use client'
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import Hamburger from "hamburger-react";
import NavMenu from "@/components/shared/header-bar/nav-menu";
import { useAuth } from "@/context/auth-context";
import { navMenuData } from "@/components/shared/header-bar/nav-menu-routes";
import { useEffect, useState } from "react";
import { AppBar, Toolbar } from "@mui/material";

function Header() {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
    const [navMenuIsOpen, setNavMenuIsOpen] = useState<boolean>(false);
    const [userMenu, setUserMenu] = useState<navMenuData[]>([]);
    const { isAuthenticated } = useAuth();

    const unregisteredUserMenuData = navMenuData.filter(item => !item.requiresAuth);
    const registeredUserMenuData = navMenuData.filter(item => item.requiresAuth);

    useEffect(() => {
        setUserMenu(isAuthenticated ? registeredUserMenuData : unregisteredUserMenuData);
    }, [isAuthenticated]);

    function hamburgerClickHandler(): void {
        setNavMenuIsOpen(!navMenuIsOpen);
    }

    function onLinkClickHandler(): void {
        setIsHamburgerOpen(false);
        setNavMenuIsOpen(false);
    }

    return (
        <AppBar style={{ backgroundColor: 'rgba(99, 102, 241, 0.7)', backdropFilter: "blur(20px)" }}>
            <Toolbar>
                <div className="flex flex-1">
                    <h1 className="md:block text-2xl text-white cursor-pointer">
                        <Link href={isAuthenticated ? '/feed' : '/'}>Hermes</Link>
                    </h1>
                </div>
                {/* Desktop Navigation Menu */}
                <div className="hidden md:flex">
                    {userMenu.map((menuItem) => (
                        <ul className="px-4 text-white cursor-pointer hover:scale-110 ease-in duration-200" key={menuItem.title}>
                            {menuItem.url ? <Link href={menuItem.url}>{menuItem.title}</Link> : <h1>{menuItem.title}</h1>}
                        </ul>
                    ))}
                </div>
                {/* Mobile Navigation Menu */}
                <div className="flex text-black md:hidden z-50" onClick={hamburgerClickHandler}>
                    <Hamburger size={22} toggled={isHamburgerOpen} toggle={setIsHamburgerOpen} />
                </div>
                {navMenuIsOpen && <div className="flex md:hidden"><NavMenu userMenu={userMenu} onLinkClick={onLinkClickHandler} /></div>}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
