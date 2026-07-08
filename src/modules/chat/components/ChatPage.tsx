'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import type { Role } from '@shared/types'
import { useChat } from '../hooks/useChat'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { ChatSidebar } from './ChatSidebar'
import { ChatEmpty } from './ChatEmpty'

export default function ChatPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('ADMIN')
  const { messages, loading, sendMessage, clearChat } = useChat(selectedRole)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [prefill, setPrefill] = useState<string | undefined>(undefined)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleExampleClick = useCallback((question: string) => {
    setPrefill(question)
  }, [])

  const handlePrefillConsumed = useCallback(() => {
    setPrefill(undefined)
  }, [])

  const conversationTitle =
    messages.length > 0
      ? messages[0].content.slice(0, 48) + (messages[0].content.length > 48 ? '...' : '')
      : 'New conversation'

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        onNewConversation={clearChat}
        hasMessages={messages.length > 0}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 bg-gray-50">
        {/* Header */}
        <header className="flex items-center px-6 py-3.5 bg-white border-b border-gray-200 flex-shrink-0">
          <h2 className="text-sm font-semibold text-gray-800 truncate">
            {conversationTitle}
          </h2>
          {messages.length > 0 && (
            <span className="ml-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium border border-primary-100">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              Active
            </span>
          )}
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <ChatEmpty onExampleClick={handleExampleClick} />
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth={1.8}
                      className="w-3.5 h-3.5"
                    >
                      <rect x="3" y="8" width="18" height="13" rx="3" />
                      <path d="M12 8V4" />
                      <circle cx="12" cy="3" r="1" fill="white" stroke="none" />
                      <circle cx="8.5" cy="13" r="1.5" fill="white" stroke="none" />
                      <circle cx="15.5" cy="13" r="1.5" fill="white" stroke="none" />
                      <path d="M8 18h8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-primary-600 animate-bounce" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <ChatInput
          onSend={sendMessage}
          loading={loading}
          prefill={prefill}
          onPrefillConsumed={handlePrefillConsumed}
        />
      </div>
    </div>
  )
}
