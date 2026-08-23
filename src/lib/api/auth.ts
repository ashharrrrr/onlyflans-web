import { apiFetch } from "./client";

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface User {
  id: number
  username: string
  email: string
}

export interface MessageResponse {
  message: string
}

export function registerUser(data: RegisterRequest) {
  console.log("data:", data)
  console.log("string-data", JSON.stringify(data))
  return apiFetch<User>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function loginUser(data: LoginRequest) {
  return apiFetch<MessageResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function getCurrentUser() {
  return apiFetch<User>("api/v1/auth/me")
}

export function logoutUser() {
  return apiFetch<MessageResponse>("/api/v1/auth/logout", {
    method: "POST"
  })
}
