import { LoginForm } from "@/components/auth/login-form"
import { AuthCard } from "@/components/auth/auth-card"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#f7f9ff] p-4 md:p-6">
      <AuthCard
        title="Welcome Back"
        description="Sign in to continue to your Creator Hub."
        footerText="Don't have an account?"
        footerHref="/register"
        footerLabel="Sign Up"
      >
        <LoginForm />
      </AuthCard>
    </div>
  )
}
