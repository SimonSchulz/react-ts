import { useCategories } from '../api/hooks/useCategories'
import { CategoryButton } from './CategoryButton.tsx'

type Props = {
  selected?: string
  onSelect: (category?: string) => void
}

export const CategoriesList = ({ selected, onSelect }: Props) => {
  const { data, isLoading } = useCategories()

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
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      <CategoryButton active={!selected} onClick={() => onSelect(undefined)}>
        All
      </CategoryButton>

      {data?.map((cat) => (
        <CategoryButton
          key={cat.slug}
          active={selected === cat.slug}
          onClick={() => onSelect(cat.slug)}
        >
          {cat.name}
        </CategoryButton>
      ))}
    </div>
  )
}
