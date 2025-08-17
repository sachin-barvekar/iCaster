import React, { useState, useMemo, useEffect } from 'react'
import { Card } from '../../components/Card'
import { Hire } from '../../types'
import { Pagination } from '../../components/Pagination'
import { SearchIcon } from '../../components/icons/IconComponents'
import { useNavigate } from 'react-router-dom'

const pastHires: Hire[] = [
  {
    id: 1,
    artist: {
      id: 5,
      name: 'Elaine Benes',
      avatarUrl: 'https://picsum.photos/seed/elaine/100/100',
      bio: 'Witty and sharp copywriter with a knack for creating compelling narratives for catalogs and campaigns.',
      skills: ['Copywriting', 'Editing', 'Content Strategy'],
      email: 'elaine.b@example.com',
      portfolioUrl: 'https://jpeterman.com',
    },
    jobTitle: 'Creative Copywriter',
    jobId: 4,
    hiredDate: 'June 15, 2024',
  },
  {
    id: 2,
    artist: {
      id: 108,
      name: 'Nina Simone',
      avatarUrl: 'https://picsum.photos/seed/simone/100/100',
      bio: 'Legendary musician and sound artist.',
      skills: ['Pro Tools', 'Sound Design', 'Mixing'],
      email: 'nina.s@example.com',
      portfolioUrl: 'https://ninasimone.com',
    },
    jobTitle: 'Sound Designer',
    jobId: 8,
    hiredDate: 'May 20, 2024',
  },
  {
    id: 3,
    artist: {
      id: 2,
      name: 'John Appleseed',
      avatarUrl: 'https://picsum.photos/seed/john/100/100',
      bio: 'Creative illustrator and animator who brings stories to life with vibrant visuals and compelling motion graphics.',
      skills: ['Illustration', 'Animation', 'After Effects'],
      email: 'john.appleseed@example.com',
      portfolioUrl: 'https://behance.net/example',
    },
    jobTitle: 'Lead Illustrator',
    jobId: 2,
    hiredDate: 'April 01, 2024',
  },
  {
    id: 4,
    artist: {
      id: 1,
      name: 'Lana Steiner',
      avatarUrl: 'https://picsum.photos/seed/lana/100/100',
      bio: 'A passionate product designer with 5+ years of experience creating intuitive and beautiful user experiences for B2B and B2C products.',
      skills: ['UI/UX Design', 'Figma', 'Prototyping'],
      email: 'lana.steiner@example.com',
      portfolioUrl: 'https://dribbble.com/example',
    },
    jobTitle: 'Senior Product Designer',
    jobId: 1,
    hiredDate: 'February 10, 2024',
  },
  {
    id: 5,
    artist: {
      id: 4,
      name: 'George Costanza',
      avatarUrl: 'https://picsum.photos/seed/george/100/100',
      bio: 'Architectural photographer with a keen eye for detail, light, and form.',
      skills: ['Architectural Design', 'Photography'],
      email: 'george.c@example.com',
      portfolioUrl: 'https://vandelayindustries.com',
    },
    jobTitle: 'Architectural Photographer',
    jobId: 5,
    hiredDate: 'January 05, 2024',
  },
  {
    id: 6,
    artist: {
      id: 109,
      name: 'Max Richter',
      avatarUrl: 'https://picsum.photos/seed/richter/100/100',
      bio: 'Composer and motion graphics enthusiast.',
      skills: ['After Effects', 'Cinema 4D'],
      email: 'max.r@example.com',
      portfolioUrl: 'https://maxrichter.com',
    },
    jobTitle: 'Motion Graphics Artist',
    jobId: 6,
    hiredDate: 'December 12, 2023',
  },
  {
    id: 7,
    artist: {
      id: 110,
      name: 'Jane Doe',
      avatarUrl: 'https://picsum.photos/seed/jane/100/100',
      bio: 'Aspiring designer with a passion for clean UIs.',
      skills: ['Figma', 'Sketch'],
      email: 'jane.d@example.com',
      portfolioUrl: 'https://janedoe.design',
    },
    jobTitle: 'Junior UI Designer',
    jobId: 7,
    hiredDate: 'November 22, 2023',
  },
]

export const PastHiresPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [jobFilter, setJobFilter] = useState('All')
  const ITEMS_PER_PAGE = 5

  const jobTitles = useMemo(() => {
    const titles = pastHires.map(hire => hire.jobTitle)
    return ['All', ...Array.from(new Set(titles))]
  }, [])

  const filteredHires = useMemo(() => {
    return pastHires.filter(hire => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        searchLower === '' ||
        hire.artist.name.toLowerCase().includes(searchLower) ||
        hire.jobTitle.toLowerCase().includes(searchLower) ||
        hire.artist.skills.join(' ').toLowerCase().includes(searchLower)

      const matchesJob = jobFilter === 'All' || hire.jobTitle === jobFilter

      return matchesSearch && matchesJob
    })
  }, [searchTerm, jobFilter])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, jobFilter])

  const handleClearFilters = () => {
    setSearchTerm('')
    setJobFilter('All')
  }

  const indexOfLastHire = currentPage * ITEMS_PER_PAGE
  const indexOfFirstHire = indexOfLastHire - ITEMS_PER_PAGE
  const currentHires = filteredHires.slice(indexOfFirstHire, indexOfLastHire)

  const handleViewDetails = (hire: Hire) => {
    navigate('/past-hires', { state: { hire } })
  }

  return (
    <div>
      <h2 className='text-3xl font-bold text-gray-900 mb-6'>Past Hires</h2>

      <Card className='mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='md:col-span-2'>
            <label
              htmlFor='search-hires'
              className='block text-sm font-medium text-gray-700'>
              Search by Name, Title, or Skill
            </label>
            <div className='relative mt-1'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <SearchIcon className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                id='search-hires'
                className='block w-full rounded-lg border-gray-300 bg-white pl-10 shadow-sm transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm px-3 py-2.5'
                placeholder='e.g., Elaine Benes, Copywriter, SEO'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='job-filter'
              className='block text-sm font-medium text-gray-700'>
              Filter by Job
            </label>
            <select
              id='job-filter'
              className='mt-1 block w-full rounded-lg border-gray-300 bg-white shadow-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm px-3 py-2.5 pr-10'
              value={jobFilter}
              onChange={e => setJobFilter(e.target.value)}>
              {jobTitles.map(title => (
                <option key={title} value={title}>
                  {title === 'All' ? 'All Jobs' : title}
                </option>
              ))}
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

      <Card padding='sm'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Artist
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Hired For
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Date Hired
                </th>
                <th scope='col' className='relative px-6 py-3'>
                  <span className='sr-only'>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {currentHires.length > 0 ? (
                currentHires.map(hire => (
                  <tr key={hire.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-11 w-11'>
                          <img
                            className='h-11 w-11 rounded-full object-cover'
                            src={hire.artist.avatarUrl}
                            alt={hire.artist.name}
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-semibold text-gray-900'>
                            {hire.artist.name}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {hire.artist.skills.slice(0, 3).join(', ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>
                        {hire.jobTitle}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {hire.hiredDate}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => handleViewDetails(hire)}
                        className='px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors'>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className='text-center py-16 px-6'>
                    <SearchIcon className='mx-auto h-12 w-12 text-gray-400' />
                    <h3 className='mt-2 text-lg font-medium text-gray-900'>
                      No Past Hires Found
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
        {filteredHires.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredHires.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={page => setCurrentPage(page)}
          />
        )}
      </Card>
    </div>
  )
}
