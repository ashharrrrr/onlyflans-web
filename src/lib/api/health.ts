import { apiFetch } from "./client"

export interface HealthReponse {
  status: string
}

export function getHealth(){
  return apiFetch<HealthReponse>("/health")
}
