"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useLogin } from "@/hooks/use-auth"
import { SocialButtons } from "./social-buttons"

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Logged in successfully.")
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="h-10 pl-10"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <p className="text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>

          <Link
            href="#"
            className="text-xs font-semibold text-sky-500 hover:text-sky-700"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="h-10 px-10"
            {...register("password")}
          />

          <button
            type="button"
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-xs text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="mt-1 h-10 bg-[#00aff0] font-semibold text-white hover:bg-[#009bd6]"
      >
        {loginMutation.isPending ? "Logging in..." : "Log In"}
        {!loginMutation.isPending && (
          <ArrowRight className="ml-1 h-4 w-4" />
        )}
      </Button>

      <div className="my-1 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-slate-400">
          Or continue with
        </span>
        <Separator className="flex-1" />
      </div>

      <SocialButtons />
    </form>
  )
}
