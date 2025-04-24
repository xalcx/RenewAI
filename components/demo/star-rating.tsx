"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  value: number
  onChange: (rating: number) => void
  disabled?: boolean
}

export function StarRating({ value, onChange, disabled = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`p-1 ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
          onClick={() => !disabled && onChange(star)}
          onMouseEnter={() => !disabled && setHoverRating(star)}
          onMouseLeave={() => !disabled && setHoverRating(0)}
          disabled={disabled}
          aria-label={`${star} estrellas`}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              (hoverRating || value) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}
