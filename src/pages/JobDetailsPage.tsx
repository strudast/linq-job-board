import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react'
import { getJobById } from '../lib/api'
import CompanyAvatar from '../components/CompanyAvatar'
import RecruitingBadge from '../components/RecruitingBadge'


function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString()
}

interface DetailItemProps {
  label: string
  value: string
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{value}</dd>
    </div>
  )
}


function JobDetailsPage() {
 const { id } = useParams<{ id: string }>()

const {data: job, isLoading, isError, error} = useQuery({
  queryKey: ['job', id],
  queryFn: ()=> getJobById(id!),
  enabled:Boolean(id)
})

 return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>

          {job && (
            <div className="mt-4 flex gap-4">
              <CompanyAvatar company={job.company} size="lg" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                  <span>{job.company}</span>
                  <span>{job.department}</span>
                  <span>{job.jobType}</span>
                </div>
                {job.isActiveRecruiting && (
                  <div className="mt-2">
                    <RecruitingBadge label="Actively Recruiting" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        {isLoading && <p className="text-slate-500">Loading job…</p>}

        {isError && (
          <p className="text-red-600">Couldn't load this job: {error.message}</p>
        )}

        {job && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Posted {formatDate(job.publishedAt)}
              </span>
              <a
                href={job.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700"
              >
                <ExternalLink className="h-4 w-4" />
                Company website
              </a>
            </div>

            <section>
              <h2 className="text-base font-semibold text-slate-900">Description</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {job.description}
              </p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-semibold text-slate-900">Details</h2>
              <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                <DetailItem label="Job ID" value={job.id} />
                <DetailItem label="Department" value={job.department} />
                <DetailItem label="Job Type" value={job.jobType} />
                <DetailItem
                  label="Actively Recruiting"
                  value={job.isActiveRecruiting ? 'Yes' : 'No'}
                />
                <DetailItem label="Posted" value={formatDate(job.publishedAt)} />
              </dl>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default JobDetailsPage