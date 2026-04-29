import * as React from 'react'
import * as React from 'react'

type Props = {
  active?: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

export const CategoryButton = ({ active, onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition ${
        active ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )
}
