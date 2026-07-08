export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
  createdAt: Date
}

export interface Source {
  file: string
  line: number
  name: string
}

export type Role = 'ADMIN' | 'DEV' | 'FINANCEIRO' | 'COMERCIAL' | 'SUPORTE'
