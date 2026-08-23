import { AuthCard } from "@/components/auth/auth-card"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#f7f9ff] p-4 md:p-6">
      <AuthCard
        title="Create an Account"
        description="Join OnlyFlans and start sharing your flan videos."
        footerText="Already have an account?"
        footerHref="/login"
        footerLabel="Log In"
      >
        <RegisterForm />
      </AuthCard>
    </div>
  )
}
