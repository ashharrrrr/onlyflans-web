"use client"

import { useState } from "react"
import { createVideo } from "@/lib/api/video"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "creating" | "uploading" | "success" | "error">("idle")

  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!file) {
      setError("Please select a video.")
      return
    }

    try {
      setError(null)
      setProgress(0)

      setStatus("creating")

      const video = await createVideo({
        title,
        filename: file.name,
        content_type: file.type,
      })

      console.log("Created video:", video)

      setStatus("uploading")

      await uploadToS3(video.upload_url, file, setProgress)

      setProgress(100)
      setStatus("success")
    } catch (error) {
      console.error(error)

      setStatus("error")
      setError(error instanceof Error ? error.message : "Something went wrong.")
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-xl">
        <div className="rounded-xl border bg-card p-6">
          <h1 className="text-2xl font-semibold">
            Upload video
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Upload a video to OnlyFlans.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium"
              >
                Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter video title"
                className="w-full rounded-md border bg-background px-3 py-2"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="video"
                className="text-sm font-medium"
              >
                Video
              </label>

              <input
                id="video"
                type="file"
                accept="video/*"
                onChange={(event) => {
                  setFile(event.target.files?.[0] ?? null)
                }}
                className="w-full rounded-md border bg-[#C6E7FF] p-2 text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-100"
                required
              />
            </div>

            {status === "uploading" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {status === "creating" && (
              <p className="text-sm text-muted-foreground">
                Preparing upload...
              </p>
            )}

            {status === "success" && (
              <p className="text-sm text-green-500">
                Upload complete!
              </p>
            )}

            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={
                status === "creating" ||
                status === "uploading"
              }
              className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "creating"
                ? "Preparing..."
                : status === "uploading"
                  ? `Uploading ${progress}%`
                  : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

function uploadToS3(
  uploadUrl: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open("PUT", uploadUrl)

    xhr.setRequestHeader("Content-Type", file.type)

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) {
        return
      }

      const percentage = Math.round(
        (event.loaded / event.total) * 100
      )

      onProgress(percentage)
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve()
      } else {
        reject(
          new Error(
            `S3 upload failed with status ${xhr.status}`
          )
        )
      }
    }

    xhr.onerror = () => {
      reject(new Error("S3 upload failed."))
    }

    xhr.send(file)
  })
}
