import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function JobListPage() {
  return <div>Job List</div>
}

function JobDetailsPage() {
  return <div>Job Details</div>
}

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JobListPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App