'use client'

import {
  KeyboardEvent,
  useRef,
  useState,
  useEffect,
  ChangeEvent,
} from 'react'
import { Spinner } from '@shared/components/Spinner'

interface ChatInputProps {
  onSend: (message: string) => void
  loading: boolean
  prefill?: string
  onPrefillConsumed?: () => void
}

export function ChatInput({ onSend, loading, prefill, onPrefillConsumed }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-fill from example questions
  useEffect(() => {
    if (prefill) {
      setValue(prefill)
      onPrefillConsumed?.()
      textareaRef.current?.focus()
    }
  }, [prefill, onPrefillConsumed])

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 180) + 'px'
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || loading) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const canSend = value.trim().length > 0 && !loading

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all duration-150">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask about business rules..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 resize-none outline-none leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed max-h-[180px] overflow-y-auto"
          />
          <button
            onClick={handleSubmit}
            disabled={!canSend}
            title={loading ? 'Generating...' : 'Send message'}
            className={`
              flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
              transition-all duration-150
              ${
                canSend
                  ? 'bg-primary-800 text-white hover:bg-primary-700 active:bg-primary-900 shadow-sm'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {loading ? (
              <Spinner size={16} color={canSend ? 'white' : '#9ca3af'} />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path
                  d="M22 2L11 13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22 11 13 2 9l20-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          Press <kbd className="font-mono bg-gray-100 px-1 rounded text-gray-500">Enter</kbd> to send,{' '}
          <kbd className="font-mono bg-gray-100 px-1 rounded text-gray-500">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  )
}
