import { url } from "inspector"

type navMenuData = {
    title: string
    url?: string
    requiresAuth: boolean
}

export const navMenuData: navMenuData[] = [
    {
        title: 'Feed',
        url: '/feed',
        requiresAuth: true
    },
    {
        title: 'Saved Articles',
        url: '/saved-articles',
        requiresAuth: true,
    },
    {
        title: 'Profile',
        url: '/profile',
        requiresAuth: true
    },
    {
        title: 'Log In',
        url: '/login',
        requiresAuth: false
    },
    {
        title: 'Register',
        url: '/register',
        requiresAuth: false
    },
    {
        title: 'Log Out',
        url: '/logout',
        requiresAuth: true
    },
]