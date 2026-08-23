"use client"

import { FolderGit2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function SocialButtons() {
  function handleGoogleLogin() {
    toast.info("Google login will be connected soon.")
  }

  function handleGithubLogin() {
    toast.info("GitHub login will be connected soon.")
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        className="h-10"
        onClick={handleGoogleLogin}
      >
        <span className="mr-2 font-bold text-[#4285F4]">G</span>
        Log in with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-10"
        onClick={handleGithubLogin}
      >
        <FolderGit2 className="mr-2 h-4 w-4" />
        Log in with GitHub
      </Button>
    </div>
  )
}
