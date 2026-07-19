export interface CreateProblemInput {
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  priority: string
  images: string[]
}

export interface ProblemResponse {
  message?: string
  error?: string
  problem?: Record<string, unknown>
}

export async function createProblem(
  data: CreateProblemInput,
  token: string
): Promise<{ ok: boolean; data: ProblemResponse }> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

  const res = await fetch(`${BACKEND_URL}/api/problems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  let body: ProblemResponse
  try {
    body = await res.json()
  } catch {
    body = { error: "Invalid server response" }
  }

  return { ok: res.ok, data: body }
}
