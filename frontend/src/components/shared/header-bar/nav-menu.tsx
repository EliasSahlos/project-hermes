import { navMenuData } from "@/components/shared/header-bar/nav-menu-routes";
import Link from "next/link";

function NavMenu() {
    return (
        <div
            className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white/80 backdrop-blur-lg overflow-hidden'>
            <ul className='text-center'>
                {navMenuData.map((menuItem) => (
                    <li className='my-5 text-xl' key={menuItem.title}>
                        {menuItem.url
                            ?
                            <Link href={menuItem?.url}>{menuItem.title}</Link>
                            :
                            <span>{menuItem.title}</span>
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavMenu