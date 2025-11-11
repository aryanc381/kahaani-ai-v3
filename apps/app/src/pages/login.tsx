import { LoginForm } from "@/components/login-form"
import { ModeToggle } from "@/components/mode-toggle"

function Login() {
  return (
    <div className="flex flex-col justify-center mt-[5vw]">
            <ModeToggle />
            <p className="text-center text-[5vw] mb-[30vw]">KahaaniAI®</p>
            <LoginForm />
        </div>  
  )
}

export default Login