import LoginBlock from "@/components/login/login-block/login-block"
import RegisterBlock from "@/components/register/register-block/register-block"
import { DomainVerification } from "@mui/icons-material"

function LoginPage() {

    return (
        <div className="flex justify-center items-center mt-[150px]">
          <LoginBlock/>  
        </div>
    )
}

export default LoginPage