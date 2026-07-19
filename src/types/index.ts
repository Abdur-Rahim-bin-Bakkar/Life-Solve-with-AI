export interface User {
  id: string
  name: string
  email: string
  image?: string | null
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  id: string
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}
