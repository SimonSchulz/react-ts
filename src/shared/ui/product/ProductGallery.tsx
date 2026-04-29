import { useState } from 'react'

type Props = {
  thumbnail: string
  images?: string[]
  title: string
}

export const ProductGallery = ({ thumbnail, images, title }: Props) => {
  const [active, setActive] = useState<string | null>(null)

  const image = active || thumbnail

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {[thumbnail, ...(images || [])].map((img) => (
          <img
            key={img}
            src={img}
            onClick={() => setActive(img)}
            className={`w-16 h-16 object-cover rounded-lg border cursor-pointer ${
              image === img ? 'ring-2 ring-black' : ''
            }`}
            alt={title}
          />
        ))}
      </div>
    </div>
  )
}
