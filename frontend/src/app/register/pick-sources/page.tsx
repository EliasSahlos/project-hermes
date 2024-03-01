'use client'
import SourcesBlock from "@/components/register/sources-block/sources-block"
import ErrorAlert from "@/components/shared/alerts/error-alert/error-alert"
import SpinnerLoading from "@/components/shared/spinner-loading/spinner-loading"
import { useAuth } from "@/context/auth-context"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function PickSourcesPage() {
    const [websiteSources, setWebsiteSources] = useState<WebsiteSources[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedSources, setSelectedSources] = useState<string[]>([])
    const [error, setError] = useState('')

    const { login } = useAuth()
    const router = useRouter()

    useEffect(() => {
        fetchSources()
    }, [])

    async function fetchSources() {
        try {
            axios.get('http://localhost:3001/api/websites/sources')
                .then((response) => {
                    setWebsiteSources(response.data.websitesSources)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error(error)
                    setIsLoading(false)
                })
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }

    }

    function onSelectedSources(selectedSources: string[]) {
        setSelectedSources(selectedSources)
    }

    function submitButtonClickHandler() {
        const registrationData = JSON.parse(localStorage.getItem('registrationData') || '{}')
        const username = registrationData.username
        const email = registrationData.email
        const password = registrationData.password

        if (username && email && password) {
            axios.post('http://localhost:3001/api/users/register', { username, email, password, selectedSources })
                .then(response => {
                    console.log("User registered successfully", response.data);
                    login(response.data.token, response.data.user); // Update authentication status
                    router.push('/feed')
                })
                .catch(error => {
                    console.error(error);
                    setError(error.response?.data?.message || 'Failed to register user');
                })
        }
    }

    console.log('selectedsources array', selectedSources);

    return (
        <div className="flex flex-col justify-center items-center px-4">
            <div className="my-8">
                <h1 className="text-2xl font-semibold text-center">Pick your favourite news sources</h1>
            </div>
            {isLoading && <SpinnerLoading />}
            {error && <ErrorAlert message={error} />}
            {!isLoading &&
                <div>
                    <div>
                        <SourcesBlock sources={websiteSources} onSelectedSources={onSelectedSources} />
                    </div>
                    <div className="flex justify-center items-center my-8">
                        <button
                            className="bg-[#d5b4e9] rounded-md shadow-md p-2 hover:scale-110 ease-in duration-200"
                            onClick={submitButtonClickHandler}
                        >
                            Complete Registration
                        </button>
                    </div>
                </div>}

        </div>
    )
}

export default PickSourcesPage


