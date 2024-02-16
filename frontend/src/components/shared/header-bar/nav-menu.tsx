import { navMenuData } from "@/components/shared/header-bar/nav-menu-routes";
import Link from "next/link";

interface NavMenuProps {
    onLinkClick: () => void;
    userMenu: navMenuData[];
}

function NavMenu({ onLinkClick, userMenu }: NavMenuProps) {
    return (
        <div
            className='z-40 flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white backdrop-blur-lg overflow-hidden'>
            <ul className='text-center'>
                {userMenu.map((menuItem: any) => (
                    <li className='my-5 text-black text-xl hover:text-purple-800 hover:scale-110 ease-in duration-200 cursor-pointer' key={menuItem.title}>
                        {menuItem.url
                            ?
                            <Link onClick={onLinkClick} href={menuItem?.url}>{menuItem.title}</Link>
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