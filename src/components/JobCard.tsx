import {Link} from 'react-router-dom'
import {Building2, Calendar} from 'lucide-react'
import type { Job} from '../lib/types'
import CompanyAvatar from './CompanyAvatar'
import RecruitingBadge from './RecruitingBadge'

interface JobCardProps {
    job: Job
}

function formatDate(iso:string):string {
    return new Date(iso).toLocaleDateString()
}

function JobCard ({job}: JobCardProps) {
    return (
        <Link
        to={`/jobs/${job.id}`}
       className="block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
       >
<div className='flex gap-4'>
       <CompanyAvatar company={job.company} />
       <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-2'>
            <h2 className='text-base font-semibold text-slate-900'>
                {job.title}
            </h2>
            {job.isActiveRecruiting && <RecruitingBadge/>}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
        <span className="inline-flex items-center gap-1">
            <Building2 className='h-3.5 w-3.5'/>
            {job.company}
            </span>
            <span>{job.department}</span>
            <span>{job.jobType}</span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
            
            <Calendar className='h-3 w-3'/>
            {formatDate(job.publishedAt)}
            </div>
       </div>
</div>
       </Link>
    )
}
export  default JobCard