'use client'
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Authentication provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState([])

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            setIsAuthenticated(true);
        }
        else {
            setIsAuthenticated(false)
        }

        const savedUserInfo = localStorage.getItem('userInfo');
        if (savedUserInfo) {
            setUserInfo(JSON.parse(savedUserInfo));
        }
    }, []);

    function register(token: string) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    }

    function login(token: string, user: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(user))
        setUserInfo(user)
        setIsAuthenticated(true);
    }

    function logout() {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/')
    }

    const contextValue: AuthContextProps = {
        isAuthenticated,
        userInfo,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// Custom hook to use the authentication context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
