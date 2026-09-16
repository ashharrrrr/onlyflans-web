import { apiFetch } from "./client";

export type CreateVideoRequest = {
  title: string
  filename: string
  content_type: string
}

export type CreateVideoResponse = {
  id: number
  title: string
  upload_url: string
  input_key: string
  status: string
}

export function createVideo(data: CreateVideoRequest) {
  return apiFetch<CreateVideoResponse>("/api/v1/videos", {
    method: "POST",
    body: JSON.stringify(data)
  })
}
