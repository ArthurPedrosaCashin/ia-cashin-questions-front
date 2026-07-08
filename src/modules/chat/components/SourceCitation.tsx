'use client'

import { useState } from 'react'
import type { Source } from '@shared/types'

interface SourceCitationProps {
  sources: Source[]
}

export function SourceCitation({ sources }: SourceCitationProps) {
  const [expanded, setExpanded] = useState(false)

  if (!sources || sources.length === 0) return null

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
        >
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>
          {sources.length} source{sources.length > 1 ? 's' : ''}
        </span>
      </button>

      {expanded && (
        <div className="mt-2 flex flex-wrap gap-2">
          {sources.map((source, index) => (
            <div
              key={index}
              title={`${source.file}:${source.line}`}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 rounded-md px-2 py-1 text-xs font-mono"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-3 h-3 flex-shrink-0"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="truncate max-w-[200px]">
                {source.name || source.file.split('/').pop()}
              </span>
              <span className="text-gray-400">:{source.line}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
