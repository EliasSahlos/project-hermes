interface NavMenuProps {
    onLinkClick: () => void;
    userMenu: navMenuData[];
}
interface navMenuData {
    title: string
    url?: string
    requiresAuth: boolean
}
