'use client'

import { useState, useCallback } from 'react'
import type { Message, Role } from '@shared/types'
import { sendMessage as sendMessageService } from '../services/chat.service'

interface UseChatReturn {
  messages: Message[]
  loading: boolean
  error: string | null
  sendMessage: (question: string) => Promise<void>
  clearChat: () => void
}

export function useChat(role: Role): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (question: string) => {
    if (!question.trim() || loading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question.trim(),
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    setError(null)

    try {
      const sessionHistory = [...messages, userMessage]
      const response = await sendMessageService(question.trim(), role, sessionHistory)

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)

      const errorAssistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Desculpe, não foi possível processar sua solicitação. Por favor, tente novamente.',
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, errorAssistantMessage])
    } finally {
      setLoading(false)
    }
  }, [messages, loading, role])

  const clearChat = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, loading, error, sendMessage, clearChat }
}
