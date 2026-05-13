interface CompanyAvatarProps {
  company: string
  size?: 'sm' | 'lg'
}

const COLORS = [
  'bg-purple-500',
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-blue-500',
  'bg-rose-500',
]

function getColor(company:string): string {
    let hash = 0
    for (let i=0;i<company.length;i++){
        hash = (hash*31 + company.charCodeAt(i)) >>> 0
    }
    return COLORS[hash % COLORS.length]
}

function getInitials (company:string): string {
  const words = company.split(/\s+/).filter(Boolean)
   if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()

}

function CompanyAvatar({ company, size = 'sm' }: CompanyAvatarProps) {
  const sizeClasses =
    size === 'lg' ? 'w-16 h-16 text-xl rounded-xl' : 'w-12 h-12 text-base rounded-lg'

  return (
    <div
      className={`${sizeClasses} ${getColor(company)} flex items-center justify-center font-semibold text-white shrink-0`}
    >
      {getInitials(company)}
    </div>
  )
}

export default CompanyAvatar