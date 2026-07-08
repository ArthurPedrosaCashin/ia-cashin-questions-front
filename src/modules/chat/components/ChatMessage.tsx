'use client'

import ReactMarkdown from 'react-markdown'
import type { Message } from '@shared/types'
import { Avatar } from '@shared/components/Avatar'
import { SourceCitation } from './SourceCitation'

interface ChatMessageProps {
  message: Message
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date instanceof Date ? date : new Date(date))
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex items-end gap-3 justify-end">
        <div className="flex flex-col items-end gap-1 max-w-[75%]">
          <div className="bg-primary-800 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 px-1">
            {formatTime(message.createdAt)}
          </span>
        </div>
        <Avatar name="User" size="sm" />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <Avatar name="AI" size="sm" />
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
          <div className="prose prose-sm prose-gray max-w-none text-gray-800">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-sm">{children}</li>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-')
                  if (isBlock) {
                    return (
                      <code className="block bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-xs font-mono overflow-x-auto my-2">
                        {children}
                      </code>
                    )
                  }
                  return (
                    <code className="bg-gray-100 text-primary-800 rounded px-1 py-0.5 text-xs font-mono">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="bg-gray-50 border border-gray-200 rounded-md overflow-x-auto my-2">
                    {children}
                  </pre>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
                h1: ({ children }) => (
                  <h1 className="text-base font-bold text-gray-900 mb-1">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-sm font-bold text-gray-900 mb-1">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">{children}</h3>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          {message.sources && message.sources.length > 0 && (
            <SourceCitation sources={message.sources} />
          )}
        </div>
        <span className="text-xs text-gray-400 px-1">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  )
}
