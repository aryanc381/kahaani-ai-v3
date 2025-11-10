import { ModeToggle } from "@/components/mode-toggle"
import { SignupForm } from "@/components/signup-form"

function Signup() {
  return (
    <div className="flex flex-col justify-center mt-[5vw]">
        <ModeToggle />
        <p className="text-center text-[5vw] mb-[5vw]">KahaaniAI®</p>
        <SignupForm />
    </div>   
  )
}

export default Signup;