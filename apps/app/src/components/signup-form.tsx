import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FaGoogle } from "react-icons/fa"
import axios from 'axios'
import { toast } from 'sonner'

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface inputProps {
  html: string
  id: string;
  type: string;
  placeholder: string;
  htmlVal: string;
  value: string;
  func: (v: string) => void;
}

interface signupProps {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

async function signupHandler({fullName, phone, email, password}: signupProps) {
  await toast.promise(
    async () => {
      const response = await axios({
        url: 'http://localhost:5000/v3/api/auth/signup',
        method: 'POST',
        data: {
          fullName: fullName,
          phone: phone,
          email: email,
          password: password
        }
      });
      return response.data;
    },
    {
      loading: 'Creating your account...',
      success: (data) => `${data.msg}`,
      error: 'Failed to create account.'
    }
  )
}

export function FieldInput({html, htmlVal, id, type, placeholder, value, func}: inputProps) {
  return(
    <Field>
      <FieldLabel htmlFor={html}>{htmlVal}</FieldLabel>
      <Input value={value} onChange={(e) => {func(e.target.value)}} id={id} type={type} placeholder={placeholder} required />
    </Field>
  )
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-medium">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">Fill in the form below to create your account</p>
        </div>
        
        <FieldInput value={fullName} func={setFullName} html="name" htmlVal="Full Name" id="name" type="text" placeholder="Aryan Chauhan" />
        <FieldInput value={phone.toString()} func={setPhone} html="phone" htmlVal="Phone Number" id="phone" type="number" placeholder="+91 9049122622" />

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" type="email" placeholder="aryan@chauhan.com" required />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        
        <FieldInput value={password} func={setPassword} html="password" htmlVal="Password" id="password" type="password" placeholder="Aryan@123" />
        
        <Button type="button" onClick={() => {if(!fullName || !phone || !email || !password) {toast.error('Please fill all fields.'); return; }; signupHandler({fullName, phone, email, password})}}>Create Account</Button>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <FaGoogle />
            <p>Sign up with Google instead</p>
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/">&nbsp;Login instead</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}