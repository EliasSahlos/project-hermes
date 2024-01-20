type AlertMessage = {
    message: string
}

function ErrorAlert({ message }: AlertMessage) {
    return (
        <div className="text-center mb-5 bg-red-200 rounded shadow-md p-3">
            <b>An Error Occurred!</b>
            <p>{message.toString()}</p>
        </div>
    )
}

export default ErrorAlert