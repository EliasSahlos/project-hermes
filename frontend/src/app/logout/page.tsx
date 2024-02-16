'use client'

import SpinnerLoading from "@/components/shared/spinner-loading/spinner-loading"
import { useAuth } from "@/context/auth-context"
import { useEffect, useState } from "react"


function logoutPage() {
    const [isLoading, setIsLoading] = useState(false)

    const { isAuthenticated, logout } = useAuth()

    useEffect(() => {
        setIsLoading(true)
        if (isAuthenticated) {
            logout()
        }
        setIsLoading(false)
    }, [])

    return (
        <>
            {isLoading && <SpinnerLoading />}
        </>
    )
}

export default logoutPage