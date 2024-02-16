import type { Metadata, ResolvingMetadata } from 'next'
import './globals.css'
import HeaderBar from '@/components/shared/header-bar/header-bar'
import { AuthProvider } from '@/context/auth-context'

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
                    <div className='mt-20 mb-2'>{children}</div>
                </AuthProvider>
            </body>
        </html>
    )
}