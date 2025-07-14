import React from 'react';

/**
 * Props:
 * - loading: boolean (shows loading state)
 * - success: boolean (shows success state)
 * - children: ReactNode (button content)
 * - className: string (additional classes)
 * - ...props: other button props
 */
export default function Button({ loading, success, children, className = '', ...props }) {
  let base = 'px-8 py-3 rounded-lg font-bold text-lg focus:outline-none transition-colors duration-200';
  let stateClass = '';

  if (success) {
    stateClass = 'bg-green-400 text-green-900';
  } else if (loading) {
    stateClass = 'bg-white text-purple-700 border border-purple-700 cursor-wait';
  } else {
    stateClass = 'bg-purple-700 text-white hover:bg-purple-800';
  }

  return (
    <button
      className={`${base} ${stateClass} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          Loading...
        </span>
      ) : success ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-5 w-5 text-green-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Success
        </span>
      ) : (
        children
      )}
    </button>
  );
} 