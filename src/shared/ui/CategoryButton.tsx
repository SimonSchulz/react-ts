import * as React from 'react'

type BtnProps = {
  active?: boolean
  children: React.ReactNode
  onClick: () => void
}

export const CategoryButton = ({ active, children, onClick }: BtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        whitespace-nowrap px-4 py-1.5 rounded-full text-sm border transition
        ${
          active
            ? 'bg-black text-white border-black'
            : 'text-gray-600 border-gray-300 hover:bg-black hover:text-white'
        }
      `}
    >
      {children}
    </button>
  )
}
