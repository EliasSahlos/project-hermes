import { useState } from "react";
import { Checkbox, TextField } from "@mui/material";
import LinearLoading from "@/components/shared/linear-loading/linear-loading";
import ErrorAlert from "@/components/shared/alerts/error-alert/error-alert";

interface RegisterBlockProps {
    onRegisterFormSubmitHandler: (username: string, email: string, password: string, isSubmitEnabled: boolean) => void;
}

function RegisterBlock({ onRegisterFormSubmitHandler }: RegisterBlockProps) {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [retypePassword, setRetypePassword] = useState<string>('');
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    const [termsChecked, setTermsChecked] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Function to check if all required fields are filled
    function isFormValid() {
        return username && email && password && retypePassword && passwordMatch && termsChecked;
    }

    // Submit form handler
    function registerFormSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isFormValid()) {
            setError('Please provide all the required fields');
            return;
        }

        onRegisterFormSubmitHandler(username, email, password, isFormValid());
    }

    // Function to validate email
    function emailValidation(email: string): boolean {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    // Event handlers for form inputs
    function usernameInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function emailInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        if (!emailValidation(e.target.value)) {
            setError('Please provide a valid email address');
        } else {
            setError('');
        }
    }

    function passwordInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        if (e.target.value === retypePassword) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }

    function retypePasswordInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setRetypePassword(e.target.value);
        if (e.target.value === password) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }

    function termsCheckboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTermsChecked(e.target.checked);
    }

    return (
        <div className="flex flex-col justify-center items-center w-[80%] lg:w-[40%] md:border-2 md:shadow-lg p-8 rounded">
            {loading && <LinearLoading />}
            {!loading && (
                <div>
                    <div className="mb-8">
                        <h1 className="font-semibold text-center text-4xl">Register</h1>
                    </div>
                    {error && <ErrorAlert message={error} />}
                    <form onSubmit={registerFormSubmitHandler}>
                        <div>
                            <TextField
                                className="w-[340px]"
                                label="Username"
                                value={username}
                                onChange={usernameInputHandler}
                            />
                        </div>
                        <div className="my-6">
                            <TextField
                                className="w-[340px]"
                                label="Email"
                                value={email}
                                onChange={emailInputHandler}
                                error={!!error}
                                helperText={error || ''}
                            />
                        </div>
                        <div className="my-6">
                            <TextField
                                className="w-[340px]"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={passwordInputHandler}
                            />
                        </div>
                        <div className="my-6">
                            <TextField
                                className="w-[340px]"
                                label="Retype Password"
                                type="password"
                                value={retypePassword}
                                onChange={retypePasswordInputHandler}
                                error={!passwordMatch}
                                helperText={!passwordMatch ? "Passwords do not match" : null}
                            />
                        </div>
                        <div>
                            <Checkbox
                                value={termsChecked}
                                onChange={termsCheckboxHandler}
                            />
                            <label className="mx-1 text-sm">I agree to the terms and privacy policy</label>
                        </div>
                        <div className="mt-8 flex justify-center items-center">
                            <button
                                className="bg-[#9354ba] text-white shadow-md rounded hover:bg-[#60377a] ease-in duration-200 p-2"
                                type="submit"
                                disabled={!isFormValid()}
                            >
                                Pick favourite sources
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default RegisterBlock;
