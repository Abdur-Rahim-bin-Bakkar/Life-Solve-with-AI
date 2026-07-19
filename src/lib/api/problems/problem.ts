const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export interface CreateProblemInput {
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  priority: string
  images: string[]
}

export interface ProblemData {
  _id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  priority: string
  images: string[]
  userId: string
  userName: string
  userImage?: string
  status: string
  reactions: {
    likes: string[]
    loves: string[]
    sads: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface ProblemResponse {
  message?: string
  error?: string
  problem?: ProblemData
  problems?: ProblemData[]
}

export interface ReactionResponse {
  reactions: {
    likes: number
    loves: number
    sads: number
    userReaction: "like" | "love" | "sad" | null
  }
}

export interface CommentData {
  _id: string
  problemId: string
  userId: string
  userName: string
  userImage?: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface CommentResponse {
  error?: string
  comment?: CommentData
  comments?: CommentData[]
  message?: string
}

async function apiFetch<T>(url: string, options?: RequestInit): Promise<{ ok: boolean; data: T }> {
  const res = await fetch(`${BACKEND_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })
  let body: T
  try {
    body = await res.json()
  } catch {
    body = { error: "Invalid server response" } as T
  }
  return { ok: res.ok, data: body }
}

export async function createProblem(data: CreateProblemInput, token: string) {
  return apiFetch<ProblemResponse>("/api/problems", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

export async function getProblems(params?: { search?: string; category?: string; sort?: string; limit?: number }) {
  const query = new URLSearchParams()
  if (params?.search) query.set("search", params.search)
  if (params?.category && params.category !== "All") query.set("category", params.category)
  if (params?.sort) query.set("sort", params.sort)
  if (params?.limit) query.set("limit", String(params.limit))
  const qs = query.toString()
  return apiFetch<ProblemResponse>(`/api/problems${qs ? `?${qs}` : ""}`)
}

export async function getProblemById(id: string) {
  return apiFetch<ProblemResponse>(`/api/problems/${id}`)
}

export async function toggleReaction(problemId: string, type: "like" | "love" | "sad", token: string) {
  return apiFetch<ReactionResponse>(`/api/problems/${problemId}/react`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ type }),
  })
}

export async function getComments(problemId: string) {
  return apiFetch<CommentResponse>(`/api/problems/${problemId}/comments`)
}

export async function createComment(problemId: string, content: string, token: string) {
  return apiFetch<CommentResponse>(`/api/problems/${problemId}/comments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content }),
  })
}

export async function updateComment(problemId: string, commentId: string, content: string, token: string) {
  return apiFetch<CommentResponse>(`/api/problems/${problemId}/comments/${commentId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content }),
  })
}

export async function deleteComment(problemId: string, commentId: string, token: string) {
  return apiFetch<CommentResponse>(`/api/problems/${problemId}/comments/${commentId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
}

export interface UpdateProblemInput {
  title?: string
  shortDescription?: string
  fullDescription?: string
  category?: string
  priority?: string
  images?: string[]
  status?: string
}

export async function updateProblemApi(id: string, data: UpdateProblemInput, token: string) {
  return apiFetch<ProblemResponse>(`/api/problems/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

export interface UserStats {
  postCount: number
  solvedCount: number
  commentCount: number
  daily: { date: string; posts: number; solved: number }[]
}

export interface OverviewStats {
  totalPosts: number
  solvedPosts: number
  totalComments: number
  daily: { date: string; posts: number; solved: number; comments: number }[]
}

export async function getUserStatsApi(token: string) {
  return apiFetch<{ stats: UserStats }>("/api/problems/stats/my", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function getOverviewStatsApi() {
  return apiFetch<{ stats: OverviewStats }>("/api/problems/stats/overview")
}
