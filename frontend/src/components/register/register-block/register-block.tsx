'use client'
import Spinner from "@/components/shared/spinner/spinner"
import { Checkbox, TextField } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

function RegisterBlock() {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [retypePassword, setRetypePassword] = useState<string>('')
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true)
    const [termsChecked, setTermsChecked] = useState<boolean>(false)
    const [error, SetError] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const isSubmitEnabled: boolean = username && email && password && retypePassword && passwordMatch && termsChecked ? true : false

    function usernameInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function emailInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    function passwordInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
        if (e.target.value === retypePassword) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    }

    function retypePasswordInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setRetypePassword(e.target.value)
        if (e.target.value === password) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    }

    function termsCheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTermsChecked(e.target.checked);
    }

    async function registerFormSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            if (isSubmitEnabled) {
                setLoading(true)

                //Send POST Request
                const response = await axios.post('http://localhost:3001/api/users/register', { username, email, password });
                console.log("Form submitted successfully", response.data);

                //Extract and store token to localStorage
                const token = response.data.token
                localStorage.setItem('token', token)

                //Clear previous outputs
                setUsername('');
                setEmail('');
                setPassword('');
                setRetypePassword('');
                setTermsChecked(false);

                router.push('/')
            } else {
                console.error("Invalid form submission")
            }
        } catch (error: any) {
            console.error(error)
            SetError(error)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-[80%] lg:w-[40%] p border-2 p-8 shadow-lg rounded">
            {loading && <Spinner />}
            {!loading && (
                <div>
                    <div className="mb-8">
                        <h1 className="font-semibold text-4xl">Register</h1>
                    </div>
                    <form onSubmit={registerFormSubmitHandler}>
                        <div>
                            <TextField
                                className="w-[340px]"
                                label="Username"
                                defaultValue={username}
                                onChange={usernameInputHandler}
                            />
                        </div>
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
                        <div className="my-6">
                            <TextField
                                className="w-[340px]"
                                label="Retype Password"
                                defaultValue={retypePassword}
                                onChange={retypePasswordInputHandler}
                                error={!passwordMatch}
                                helperText={!passwordMatch ? "Passwords do not match" : null}
                            />
                        </div>
                        <div>
                            {/* <input className="cursor-pointer" type="checkbox" onChange={termsCheckboxHandler} checked={termsChecked} /> */}
                            <Checkbox value={termsChecked} onChange={termsCheckboxHandler} />
                            <label className="mx-2">I agree the terms and privacy policy</label>
                        </div>
                        <div className="mt-8 flex justify-center items-center">
                            {isSubmitEnabled && (
                                <button className="bg-[#9354ba] text-white shadow-md rounded hover:bg-[#60377a] ease-in duration-200 p-4 ">
                                    Click to Register
                                </button>
                            )}
                            {!isSubmitEnabled && (
                                <button disabled className="bg-[#dbc0ec] text-white shadow-md rounded p-4 cursor-not-allowed">
                                    Click to Register
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default RegisterBlock