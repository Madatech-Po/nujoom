import type { HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'cloud' | 'star' | 'meadow'
}

const toneClasses = {
  cloud: 'bg-cloud',
  star: 'bg-star-300/40 ring-2 ring-star-400',
  meadow: 'bg-meadow-100',
} as const

/** Rounded surface for grouping content (a letter, a level, a result). */
export function Card({ tone = 'cloud', className = '', ...rest }: CardProps) {
  return (
    <div
      className={['rounded-bubble p-5 shadow-float', toneClasses[tone], className].join(' ')}
      {...rest}
    />
  )
}
