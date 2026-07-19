const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export interface NotificationData {
  _id: string
  userId: string
  type: "problem_created" | "problem_resolved" | "new_comment" | "new_reaction" | "new_message"
  title: string
  message: string
  referenceId: string
  read: boolean
  createdAt: string
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

export async function getNotifications(token: string, page = 1, limit = 20) {
  return apiFetch<{ notifications: NotificationData[]; total: number; page: number; totalPages: number }>(
    `/api/notifications?page=${page}&limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export async function getUnreadCount(token: string) {
  return apiFetch<{ count: number }>("/api/notifications/unread-count", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function markAsRead(token: string, id: string) {
  return apiFetch<{ message: string }>(`/api/notifications/${id}/read`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function markAllAsRead(token: string) {
  return apiFetch<{ message: string }>("/api/notifications/read-all", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
}
