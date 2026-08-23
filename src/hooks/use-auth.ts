"use client"

import { useMutation, useQuery} from "@tanstack/react-query"

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser
} from "@/lib/api/auth"

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  })
}

export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
  })
}
