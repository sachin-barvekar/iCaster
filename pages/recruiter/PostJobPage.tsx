import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Card } from '../../components/Card'
import { Job } from '../../types'
import { PostJobModal } from '../../components/PostJobModal'
import { BoostJobModal } from '../../components/BoostJobModal'
import {
  DotsHorizontalIcon,
  ZapIcon,
  SearchIcon,
} from '../../components/icons/IconComponents'
import { Pagination } from '../../components/Pagination'
import { useNavigate } from 'react-router-dom'

const getStatusStyles = (status: Job['status']) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 focus:ring-green-500'
    case 'Draft':
      return 'bg-yellow-100 text-yellow-800 focus:ring-yellow-500'
    case 'Closed':
      return 'bg-gray-200 text-gray-800 focus:ring-gray-500'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const initialJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Product Designer',
    type: 'Full-time',
    applicants: 18,
    status: 'Active',
    postedDate: '5 days ago',
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      'We are looking for a senior product designer to join our team.',
    skills: 'Figma, UI/UX, Prototyping',
    boosted: true,
  },
  {
    id: 2,
    title: 'Lead Illustrator',
    type: 'Contract',
    applicants: 32,
    status: 'Active',
    postedDate: '1 week ago',
    createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Seeking a talented illustrator for a new project.',
    skills: 'Illustration, Procreate',
    boosted: false,
  },
  {
    id: 3,
    title: 'Brand Designer',
    type: 'Full-time',
    applicants: 0,
    status: 'Draft',
    postedDate: '2 days ago',
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Join our marketing team as a brand designer.',
    skills: 'Branding, Adobe Suite',
    boosted: false,
  },
  {
    id: 4,
    title: 'Creative Copywriter',
    type: 'Part-time',
    applicants: 56,
    status: 'Closed',
    postedDate: '1 month ago',
    createdDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Write compelling copy for our creative campaigns.',
    skills: 'Copywriting, SEO',
    boosted: false,
  },
  {
    id: 5,
    title: 'Architectural Photographer',
    type: 'Contract',
    applicants: 21,
    status: 'Active',
    postedDate: '3 days ago',
    createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Capture stunning photos of architectural projects.',
    skills: 'Photography, Lightroom',
    boosted: false,
  },
  {
    id: 6,
    title: 'Motion Graphics Artist',
    type: 'Full-time',
    applicants: 12,
    status: 'Active',
    postedDate: '10 days ago',
    createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Create engaging motion graphics for our videos.',
    skills: 'After Effects, Cinema 4D',
    boosted: false,
  },
  {
    id: 7,
    title: 'Junior UI Designer',
    type: 'Full-time',
    applicants: 45,
    status: 'Active',
    postedDate: '12 days ago',
    createdDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Assist our design team with UI tasks.',
    skills: 'Figma, Sketch',
    boosted: false,
  },
  {
    id: 8,
    title: 'Sound Designer',
    type: 'Freelance',
    applicants: 8,
    status: 'Closed',
    postedDate: '2 months ago',
    createdDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Design sound for our new game.',
    skills: 'Pro Tools, Sound Design',
    boosted: false,
  },
  {
    id: 9,
    title: 'SEO Specialist',
    type: 'Part-time',
    applicants: 25,
    status: 'Active',
    postedDate: '15 days ago',
    createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Optimize our web content for search engines.',
    skills: 'SEO, Google Analytics',
    boosted: true,
  },
  {
    id: 10,
    title: 'Videographer',
    type: 'Contract',
    applicants: 15,
    status: 'Active',
    postedDate: '20 days ago',
    createdDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Shoot and edit video content for social media.',
    skills: 'Premiere Pro, Videography',
    boosted: false,
  },
  {
    id: 11,
    title: 'Head of Content',
    type: 'Full-time',
    applicants: 3,
    status: 'Draft',
    postedDate: '1 day ago',
    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Lead our content strategy and team.',
    skills: 'Content Strategy, Management',
    boosted: false,
  },
]
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const PostJobPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [jobToBoost, setJobToBoost] = useState<Job | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | Job['status']>('All')
  const [typeFilter, setTypeFilter] = useState<'All' | Job['type']>('All')
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const navigate = useNavigate()

  const ITEMS_PER_PAGE = 5

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearchTerm = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesStatus =
        statusFilter === 'All' || job.status === statusFilter
      const matchesType = typeFilter === 'All' || job.type === typeFilter
      return matchesSearchTerm && matchesStatus && matchesType
    })
  }, [jobs, searchTerm, statusFilter, typeFilter])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, typeFilter])

  const handleViewApplicants = (job: Job) => {
    navigate('/applicants', { state: { job } })
  }

  const handleOpenCreateModal = () => {
    setEditingJob(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (job: Job) => {
    setEditingJob(job)
    setIsModalOpen(true)
    setActiveDropdown(null)
  }

  const handleOpenBoostModal = (job: Job) => {
    setJobToBoost(job)
    setIsBoostModalOpen(true)
    setActiveDropdown(null)
  }

  const handleSaveJob = (jobData: Job) => {
    if (jobData.id) {
      setJobs(jobs.map(j => (j.id === jobData.id ? { ...j, ...jobData } : j)))
    } else {
      const newJob = {
        ...jobData,
        id: Date.now(),
        applicants: 0,
        status: 'Draft' as const,
        createdDate: new Date().toISOString(),
        postedDate: 'Just now',
        boosted: false,
      }
      setJobs([newJob, ...jobs])
    }
  }

  const handleStatusChange = (jobId: number, status: Job['status']) => {
    setJobs(jobs.map(j => (j.id === jobId ? { ...j, status } : j)))
  }

  const handleBoostJob = (jobId: number) => {
    setJobs(jobs.map(j => (j.id === jobId ? { ...j, boosted: true } : j)))
    setIsBoostModalOpen(false)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setStatusFilter('All')
    setTypeFilter('All')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeDropdown])

  const indexOfLastJob = currentPage * ITEMS_PER_PAGE
  const indexOfFirstJob = indexOfLastJob - ITEMS_PER_PAGE
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  return (
    <>
      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveJob}
        jobToEdit={editingJob}
      />
      <BoostJobModal
        isOpen={isBoostModalOpen}
        onClose={() => setIsBoostModalOpen(false)}
        onBoost={handleBoostJob}
        jobToBoost={jobToBoost}
      />
      <div>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl font-bold text-gray-900'>My Jobs</h2>
          <button
            onClick={handleOpenCreateModal}
            className='inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
            Add Job
          </button>
        </div>

        <Card className='mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
            <div className='md:col-span-2'>
              <label
                htmlFor='search-jobs'
                className='block text-sm font-medium text-gray-700'>
                Search by Title
              </label>
              <div className='relative mt-1'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <SearchIcon className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  name='search'
                  id='search-jobs'
                  className='block w-full rounded-lg border-gray-300 bg-white pl-10 shadow-sm transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm px-3 py-2.5'
                  placeholder='e.g., Product Designer'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='status-filter'
                className='block text-sm font-medium text-gray-700'>
                Status
              </label>
              <select
                id='status-filter'
                name='status'
                className='mt-1 block w-full rounded-lg border-gray-300 bg-white shadow-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm px-3 py-2.5 pr-10'
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}>
                <option value='All'>All Statuses</option>
                <option value='Active'>Active</option>
                <option value='Draft'>Draft</option>
                <option value='Closed'>Closed</option>
              </select>
            </div>
            <div>
              <label
                htmlFor='type-filter'
                className='block text-sm font-medium text-gray-700'>
                Job Type
              </label>
              <select
                id='type-filter'
                name='type'
                className='mt-1 block w-full rounded-lg border-gray-300 bg-white shadow-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm px-3 py-2.5 pr-10'
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value as any)}>
                <option value='All'>All Types</option>
                <option value='Full-time'>Full-time</option>
                <option value='Part-time'>Part-time</option>
                <option value='Contract'>Contract</option>
                <option value='Freelance'>Freelance</option>
              </select>
            </div>
            <div className='flex items-end'>
              <button
                onClick={handleClearFilters}
                className='w-full justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors'>
                Clear
              </button>
            </div>
          </div>
        </Card>

        <Card padding='none'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Job Title
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Applicants
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Date Posted
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {currentJobs.length > 0 ? (
                  currentJobs.map(job => (
                    <tr key={job.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center gap-2'>
                          <div className='text-sm font-semibold text-gray-900'>
                            {job.title}
                          </div>
                          {job.boosted && (
                            <div
                              title='Boosted Job'
                              className='flex items-center text-secondary'>
                              <ZapIcon className='h-4 w-4' />
                            </div>
                          )}
                        </div>
                        <div className='text-sm text-gray-500'>{job.type}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <select
                          value={job.status}
                          onChange={e =>
                            handleStatusChange(
                              job.id,
                              e.target.value as Job['status'],
                            )
                          }
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md border-transparent focus:ring-2 focus:outline-none ${getStatusStyles(
                            job.status,
                          )}`}
                          onClick={e => e.stopPropagation()} // prevent row click
                        >
                          <option value='Active'>Active</option>
                          <option value='Draft'>Draft</option>
                          <option value='Closed'>Closed</option>
                        </select>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
                        {job.applicants}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {formatDate(job.createdDate)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <div
                          className='relative inline-block text-left'
                          ref={activeDropdown === job.id ? dropdownRef : null}>
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                job.id === activeDropdown ? null : job.id,
                              )
                            }
                            className='p-2 rounded-full hover:bg-gray-100'>
                            <DotsHorizontalIcon className='h-5 w-5 text-gray-500' />
                          </button>
                          {activeDropdown === job.id && (
                            <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10'>
                              <div
                                className='py-1'
                                role='menu'
                                aria-orientation='vertical'
                                aria-labelledby='options-menu'>
                                <button
                                  onClick={() => handleOpenEditModal(job)}
                                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                  role='menuitem'>
                                  Edit Job
                                </button>
                                <button
                                  onClick={() => handleOpenBoostModal(job)}
                                  disabled={
                                    job.boosted || job.status === 'Closed'
                                  }
                                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                                  role='menuitem'>
                                  {job.boosted ? 'Boosted' : 'Boost Job'}
                                </button>
                                <button
                                  onClick={() => handleViewApplicants(job)}
                                  disabled={
                                    job.status === 'Draft' ||
                                    job.applicants === 0
                                  }
                                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                                  role='menuitem'>
                                  View Applicants
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className='text-center py-16 px-6'>
                      <SearchIcon className='mx-auto h-12 w-12 text-gray-400' />
                      <h3 className='mt-2 text-lg font-medium text-gray-900'>
                        No Jobs Found
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        Try adjusting your search or filter criteria.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredJobs.length > 0 && (
            <div className='border-t border-gray-200'>
              <Pagination
                currentPage={currentPage}
                totalItems={filteredJobs.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={page => setCurrentPage(page)}
              />
            </div>
          )}
        </Card>
      </div>
    </>
  )
}
