'use client'

import { useState } from 'react'
import type { Role } from '@shared/types'
import { Button } from '@shared/components/Button'

interface ChatSidebarProps {
  onNewConversation: () => void
  hasMessages: boolean
  selectedRole: Role
  onRoleChange: (role: Role) => void
}

const ROLES: Role[] = ['ADMIN', 'DEV', 'FINANCEIRO', 'COMERCIAL', 'SUPORTE']

const roleLabels: Record<Role, string> = {
  ADMIN: 'Admin',
  DEV: 'Developer',
  FINANCEIRO: 'Financial',
  COMERCIAL: 'Commercial',
  SUPORTE: 'Support',
}

export function ChatSidebar({
  onNewConversation,
  hasMessages,
  selectedRole,
  onRoleChange,
}: ChatSidebarProps) {
  const [showRoleMenu, setShowRoleMenu] = useState(false)

  return (
    <aside className="w-64 flex flex-col h-full bg-white border-r border-gray-200 flex-shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={1.8}
              className="w-4.5 h-4.5 w-5 h-5"
            >
              <rect x="3" y="8" width="18" height="13" rx="3" />
              <path d="M12 8V4" />
              <circle cx="12" cy="3" r="1" fill="white" stroke="none" />
              <circle cx="8.5" cy="13" r="1.5" fill="white" stroke="none" />
              <circle cx="15.5" cy="13" r="1.5" fill="white" stroke="none" />
              <path d="M8 18h8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">Cashin AI</p>
            <p className="text-xs text-gray-400 leading-tight">Assistant</p>
          </div>
        </div>
      </div>

      {/* New conversation */}
      {/* <div className="px-3 pt-4 pb-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onNewConversation}
          className="w-full justify-start gap-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          New conversation
        </Button>
      </div> */}

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 mb-2">
          Recent
        </p>
        {hasMessages ? (
          <div className="rounded-lg bg-primary-50 border border-primary-100 px-3 py-2 cursor-default">
            <p className="text-xs font-medium text-primary-800 truncate">Current session</p>
            <p className="text-xs text-gray-400 mt-0.5">Active</p>
          </div>
        ) : (
          <p className="text-xs text-gray-400 px-2 py-1">No conversations yet</p>
        )}
      </div>

      {/* Role selector */}
      <div className="px-3 py-3 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-1">
          Role
        </p>
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu((p) => !p)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm text-gray-700 font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
              {roleLabels[selectedRole]}
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showRoleMenu ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showRoleMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role)
                    setShowRoleMenu(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-primary-50 hover:text-primary-800 ${
                    selectedRole === role
                      ? 'bg-primary-50 text-primary-800 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {roleLabels[role]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User info */}
      <div className="px-3 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth={1.8}
              className="w-4 h-4"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">User</p>
            <p className="text-xs text-gray-400">{roleLabels[selectedRole]}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
