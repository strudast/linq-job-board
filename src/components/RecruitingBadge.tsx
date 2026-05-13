import { Zap } from 'lucide-react'
interface RecruitingBadgeProps {
    label?:string
}

function RecruitingBadge(
    {label = 'Hiring'}: RecruitingBadgeProps
) {
    return (
 <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
<Zap className="h-3 w-3" fill="currentColor" />
      {label}
</span>
    )
}
export default RecruitingBadge