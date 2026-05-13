import { useParams } from 'react-router-dom'

function JobDetailsPage() {
  const { id } = useParams()
  return <div>Job details for ID: {id}</div>
}

export default JobDetailsPage