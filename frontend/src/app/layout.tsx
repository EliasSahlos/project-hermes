import type { Metadata, ResolvingMetadata } from 'next'
import './globals.css'
import HeaderBar from '@/components/shared/header-bar/header-bar'
import { AuthProvider } from '@/context/auth-context'
import MUIHeaderbar from '@/components/shared/header-bar/MUI-Header-bar'

export const metadata: Metadata = {
    title: 'NewsApp - Homepage'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <HeaderBar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}