'use client'
import Spinner from "@/components/shared/spinner/spinner"
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
            {isLoading && <Spinner />}
        </>
    )
}

export default logoutPage