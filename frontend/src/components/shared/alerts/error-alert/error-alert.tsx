import { Alert } from "@mui/material"

function ErrorAlert({ message }: { message: string }) {
    return (
        <Alert severity="error">{message}</Alert>
    )
}

export default ErrorAlert