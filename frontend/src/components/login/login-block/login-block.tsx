'use client'
import Spinner from "@/components/shared/spinner/spinner"
import { useAuth } from "@/context/auth-context"
import { TextField } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

function LoginBlock() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, SetError] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { login } = useAuth()

    function emailInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    function passwordInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    async function loginFormSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3001/api/users/login', { email, password });
            console.log("User Logged in successfully", response.data);
            login(response.data.token)

            setEmail('');
            setPassword('');
        } catch (error: any) {
            console.error(error);
            SetError(error);
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-[80%] lg:w-[40%] p border-2 p-8 shadow-lg rounded">
            {loading && <Spinner />}
            {!loading && (
                <div>
                    <div className="mb-8">
                        <h1 className="font-semibold text-center text-4xl">Login</h1>
                    </div>
                    <form onSubmit={loginFormSubmitHandler}>
                        <div className="my-6">
                            <TextField
                                className="w-[340px]"
                                label="Email"
                                defaultValue={email}
                                onChange={emailInputHandler}
                            />
                        </div>
                        <div className="my-6">
                            <TextField
                                className="w-[340px]"
                                label="Password"
                                defaultValue={password}
                                onChange={passwordInputHandler}
                            />
                        </div>
                        <div className="mt-8 flex justify-center items-center">
                            <button className="bg-[#9354ba] text-white shadow-md rounded hover:bg-[#60377a] ease-in duration-200 p-4 ">
                                Click to Login
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default LoginBlock