import { ChevronDown } from 'lucide-react'

export type SortOrder = 'desc' | 'asc'

interface JobFiltersProps {
  sort: SortOrder
  recruitingOnly: boolean
  onSortChange: (sort: SortOrder) => void
  onRecruitingChange: (value: boolean) => void
}

function JobFilters({ sort, recruitingOnly, onSortChange, onRecruitingChange }: JobFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
          aria-label="Sort by date"
          className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <option value="desc">Date (newest first)</option>
          <option value="asc">Date (oldest first)</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={recruitingOnly}
          onChange={(e) => onRecruitingChange(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
        />
        Actively Recruiting
      </label>
    </div>
  )
}
export default JobFilters