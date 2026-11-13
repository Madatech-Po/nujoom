export interface AvatarBadgeProps {
  /** Built-in avatar (emoji or image URL from the app's own avatar set — never a photo upload). */
  avatar: string
  /** Child's nickname; shown under the avatar when provided. */
  name?: string
  size?: 'sm' | 'md' | 'lg'
  selected?: boolean
}

const sizeClasses = {
  sm: 'size-12 text-2xl',
  md: 'size-16 text-4xl',
  lg: 'size-24 text-6xl',
} as const

function isImage(avatar: string) {
  return /^(\/|https?:|data:image\/)/.test(avatar)
}

/** Round avatar with an optional nickname, used in the player picker, rooms and leaderboards. */
export function AvatarBadge({ avatar, name, size = 'md', selected = false }: AvatarBadgeProps) {
  return (
    <figure className="inline-flex flex-col items-center gap-1">
      <span
        className={[
          'flex items-center justify-center overflow-hidden rounded-full bg-cloud shadow-pop',
          selected ? 'ring-4 ring-star-400' : 'ring-2 ring-night-200',
          sizeClasses[size],
        ].join(' ')}
      >
        {isImage(avatar) ? (
          <img src={avatar} alt="" className="size-full object-cover" />
        ) : (
          <span aria-hidden="true">{avatar}</span>
        )}
      </span>
      {name ? (
        <figcaption className="max-w-24 truncate text-kid-sm font-bold">{name}</figcaption>
      ) : null}
    </figure>
  )
}
