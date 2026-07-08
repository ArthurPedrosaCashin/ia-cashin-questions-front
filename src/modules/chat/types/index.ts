export type { Message, Source, Role } from '@shared/types'

export interface ChatRequest {
  question: string
  sessionHistory: import('@shared/types').Message[]
}

export interface ChatResponse {
  answer: string
  sources: import('@shared/types').Source[]
}
