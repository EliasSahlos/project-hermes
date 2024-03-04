'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import RegisterBlock from "@/components/register/register-block/register-block";
import { useAuth } from "@/context/auth-context";

function RegisterPage() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { login } = useAuth();
    const router = useRouter();

    function onRegisterFormSubmitHandler(username: string, email: string, password: string, isSubmitEnabled: boolean) {
        if (!isSubmitEnabled) {
            setError('Please provide all the required fields');
            return;
        }
        setError('');
        setLoading(true);

        axios.post('http://localhost:3001/api/users/register', { username, email, password })
            .then(response => {
                console.log("User registered successfully", response.data);
                login(response.data.token, response.data.user);
                router.push('/feed');
            })
            .catch(error => {
                console.error(error);
                setError(error.response?.data?.message || 'Failed to register user');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="flex justify-center items-center mt-[80px]">
            <RegisterBlock onRegisterFormSubmitHandler={onRegisterFormSubmitHandler} />
        </div>
    );
}

export default RegisterPage;
