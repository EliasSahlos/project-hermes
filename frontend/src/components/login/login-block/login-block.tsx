'use client'
import ErrorAlert from "@/components/shared/alerts/error-alert/error-alert"
import LinearLoading from "@/components/shared/linear-loading/linear-loading"
import { useAuth } from "@/context/auth-context"
import { Alert, LinearProgress, TextField } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

function LoginBlock() {
    const [email, setEmail] = useState<string>('')
    const [emailValidationError, setEmailValidationError] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [error, SetError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const { login } = useAuth()

    function emailValidation(email: string) {
        const regex = /\S+@\S+\.\S+/
        return regex.test(email) //True if matches, False if not
    }

    function emailInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
        if (!emailValidation(e.target.value)) {
            setEmailValidationError(true)
        } else {
            setEmailValidationError(false)
        }
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
            if (error.response.data.message) {
                SetError(error.response.data.message)
            }
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-[80%] lg:w-[40%] 2xl:w-[20%] p border-2 p-8 shadow-lg rounded">
            {loading && <LinearLoading />}
            <div>
                <div className="mb-8">
                    <h1 className="font-semibold text-center text-4xl">Login</h1>
                </div>
                {error && <ErrorAlert message={error} />}
                <form onSubmit={loginFormSubmitHandler}>
                    <div className="flex justify-center items-center my-6">
                        <TextField
                            className="w-[340px]"
                            type="email"
                            label="Email"
                            defaultValue={email}
                            error={emailValidationError}
                            helperText={emailValidationError ? 'Please Add an Email' : ''}
                            onChange={emailInputHandler}
                        />
                    </div>
                    <div className="flex justify-center items-center my-6">
                        <TextField
                            className="w-[340px]"
                            type="password"
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
        </div>
    )
}

export default LoginBlock