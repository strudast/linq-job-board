import {Search} from 'lucide-react'

interface SearchBarProps {
    value:string
    onChange: (value:string)=>void
}

function SearchBar ({value, onChange} : SearchBarProps) {
    return (
<div className='relative'>
 <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <input
    type='search'
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder='Search jobs, companies, departments'
    aria-label='Search jobs'
     className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
     />
</div>
    )
}
export default SearchBar