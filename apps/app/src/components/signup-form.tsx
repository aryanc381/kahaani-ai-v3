import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FaGoogle } from "react-icons/fa"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface inputProps {
  html: string
  id: string;
  type: string;
  placeholder: string;
  htmlVal: string;
}

export function FieldInput({html, htmlVal, id, type, placeholder}: inputProps) {
  return(
    <Field>
      <FieldLabel htmlFor={html}>{htmlVal}</FieldLabel>
      <Input id={id} type={type} placeholder={placeholder} required />
    </Field>
  )
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-medium">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">Fill in the form below to create your account</p>
        </div>
        
        <FieldInput html="name" htmlVal="Full Name" id="name" type="text" placeholder="Aryan Chauhan" />
        <FieldInput html="phone" htmlVal="Phone Number" id="phone" type="number" placeholder="+91 9049122622" />

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="aryan@chauhan.com" required />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        
        <FieldInput html="password" htmlVal="Password" id="password" type="password" placeholder="Aryan@123" />
        
        <Button type="submit">Create Account</Button>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <FaGoogle />
            <p>Sign up with Google instead</p>
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="#">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}