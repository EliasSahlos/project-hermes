'use client'
import { useAuth } from '@/context/auth-context'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/feed')
        }
    }, [isAuthenticated])

    return (
        <div className='flex justify-center items-center'>
            Home page of project is working
        </div>
    )
}
