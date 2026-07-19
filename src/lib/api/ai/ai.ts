const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export interface AISession {
  _id: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

export interface AIMessage {
  role: "user" | "assistant"
  content: string
  createdAt?: string
}

export interface AISessionDetail {
  _id: string
  userId: string
  sessionType: "solver" | "chat"
  title: string
  messages: AIMessage[]
  createdAt: string
  updatedAt: string
}

async function getToken(): Promise<string | null> {
  try {
    const { authClient } = await import("@/lib/auth-client")
    const session = await authClient.getSession()
    const token = session?.data?.session?.token || session?.data?.session?.id || null
    return token
  } catch {
    return null
  }
}

export async function sendSolverMessage(message: string, sessionId: string | null, token: string) {
  const res = await fetch(`${BACKEND_URL}/api/ai/solver`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message, sessionId }),
  })
  return res
}

export async function getSolverSessions(token: string) {
  const res = await fetch(`${BACKEND_URL}/api/ai/solver/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data as { sessions: AISession[] }
}

export async function getSolverSession(id: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/api/ai/solver/sessions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data as { session: AISessionDetail }
}

export async function sendChatMessage(message: string, sessionId: string | null, token: string) {
  const res = await fetch(`${BACKEND_URL}/api/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message, sessionId }),
  })
  return res
}

export async function getChatSessions(token: string) {
  const res = await fetch(`${BACKEND_URL}/api/ai/chat/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data as { sessions: AISession[] }
}

export async function getChatSession(id: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/api/ai/chat/sessions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data as { session: AISessionDetail }
}

export async function deleteChatSession(id: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/api/ai/chat/sessions/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data as { message?: string; error?: string }
}
