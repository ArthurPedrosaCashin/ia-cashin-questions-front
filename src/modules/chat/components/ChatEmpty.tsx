"use client";

interface ChatEmptyProps {
  onExampleClick: (question: string) => void;
}

const EXAMPLE_QUESTIONS = [
  "Qual é o limite diário de TED?",
  "Como funciona o fluxo de aprovação de pedidos?",
  "O que acontece quando uma transação PIX falha?",
  "Quais permissoes podem alterar senha de um usuario no backoffice ?",
];

export function ChatEmpty({ onExampleClick }: ChatEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
      {/* Logo / Icon */}
      <div className="mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center shadow-lg shadow-primary-200">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={1.6}
          className="w-10 h-10"
        >
          <rect x="3" y="8" width="18" height="13" rx="3" />
          <path d="M12 8V4" />
          <circle cx="12" cy="3" r="1" fill="white" stroke="none" />
          <circle cx="8.5" cy="13" r="1.5" fill="white" stroke="none" />
          <circle cx="15.5" cy="13" r="1.5" fill="white" stroke="none" />
          <path d="M8 18h8" strokeLinecap="round" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Cashin AI Assistant
      </h1>
      <p className="text-gray-500 text-sm mb-10 max-w-sm">
        Ask me anything about the system&apos;s business rules
      </p>

      {/* Example questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {EXAMPLE_QUESTIONS.map((question) => (
          <button
            key={question}
            onClick={() => onExampleClick(question)}
            className="text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50 transition-colors duration-150 shadow-sm group"
          >
            <p className="text-sm text-gray-700 group-hover:text-primary-800 font-medium leading-snug">
              {question}
            </p>
            <span className="mt-2 text-xs text-gray-400 group-hover:text-primary-500">
              Click to ask
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
