import { CategoryButton } from './CategoryButton'
import { useRef } from 'react'
import { useCategories } from '../../api/hooks/useCategories.ts'
import * as React from 'react'

type Props = {
  selected?: string
  onSelect: (category?: string) => void
}

export const CategoriesList = ({ selected, onSelect }: Props) => {
  const { data, isLoading } = useCategories()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    category?: string
  ) => {
    onSelect(category)

    const container = containerRef.current
    const el = e.currentTarget

    if (!container || !el) return

    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    const offset =
      elRect.left -
      containerRect.left -
      containerRect.width / 2 +
      elRect.width / 2

    container.scrollBy({
      left: offset,
      behavior: 'smooth'
    })
  }

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 min-w-[90px] bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex gap-2 overflow-x-auto pb-2 no-scrollbar"
    >
      <CategoryButton
        active={!selected}
        onClick={(e) => handleClick(e, undefined)}
      >
        All
      </CategoryButton>

      {data?.map((cat) => (
        <CategoryButton
          key={cat.slug}
          active={selected === cat.slug}
          onClick={(e) => handleClick(e, cat.slug)}
        >
          {cat.name}
        </CategoryButton>
      ))}
    </div>
  )
}
