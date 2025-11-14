import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FaGoogle } from "react-icons/fa"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface LoginProps {
  email: string;
  pass: string;
}



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  async function loginHandler({email, pass}: LoginProps) {
    await toast.promise(
      async () => {
        const response = await axios({
          url: ' https://unfleshly-epochally-versie.ngrok-free.dev/v3/api/auth/login',
          method: 'POST',
          data: {
            email: email,
            password: pass
          }
        });
        if(response.data.status === 200) {
          setTimeout(() => {navigate('/home');}, 5000);
        }
        return response.data;
        
      },
      {
        loading: 'Logging in...',
        success: (data) => `${data.msg}`,
        error: 'Failed to Login, try again in sometime.'
      }
    )
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-medium">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" type="email" placeholder="user@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input value={pass} onChange={(e) => {setPass(e.target.value)}} id="password" type="password" placeholder="password@123" required />
        </Field>
        <Field>
          <Button type="button" onClick={() => {if(!email || !pass) {toast.error('Please fill all fields.'); return;} loginHandler({email, pass})}}>Login</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <FaGoogle />
            <p>Login with Google instead</p>
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
