const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export interface UserData {
  _id: string
  name: string
  email: string
  image: string | null
}

export interface ConversationData {
  _id: string
  participants: string[]
  otherUserId: string
  otherUserName: string
  otherUserImage: string | null
  lastMessage: string | null
  lastMessageBy: string | null
  lastMessageAt: string | null
  createdAt: string
  updatedAt: string
  isNew?: boolean
}

export interface MessageData {
  _id: string
  conversationId: string
  senderId: string
  senderName: string
  senderImage: string | null
  receiverId: string
  content: string
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

type ApiResponse<T> = T & { error?: string }

export async function getAllUsers(token: string) {
  return apiFetch<ApiResponse<{ users: UserData[] }>>("/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function getConversations(token: string) {
  return apiFetch<ApiResponse<{ conversations: ConversationData[] }>>("/api/messages/conversations", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function getOrCreateConversation(token: string, participantId: string) {
  return apiFetch<ApiResponse<{ conversation: ConversationData }>>("/api/messages/conversations", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ participantId }),
  })
}

export async function getMessages(token: string, conversationId: string) {
  return apiFetch<ApiResponse<{ messages: MessageData[] }>>(`/api/messages/conversations/${conversationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function sendMessage(token: string, conversationId: string, content: string) {
  return apiFetch<ApiResponse<{ message: MessageData }>>(`/api/messages/conversations/${conversationId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content }),
  })
}
