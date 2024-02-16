
'use client'
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    register: (token: string) => void;
    login: (token: string) => void;
    logout: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Authentication provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            setIsAuthenticated(true);
        }
        else {
            setIsAuthenticated(false)
        }
    }, []);

    function register(token: string) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        router.push('/register/pick-sources')
    }

    function login(token: string) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        router.push('/feed')
    }

    function logout() {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/')
    }

    const contextValue: AuthContextProps = {
        isAuthenticated,
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
