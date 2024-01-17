import type { Metadata, ResolvingMetadata } from 'next'
import './globals.css'
import HeaderBar from '@/components/shared/header-bar/header-bar'

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
                <HeaderBar />
                {children}
            </body>
        </html>
    )
}