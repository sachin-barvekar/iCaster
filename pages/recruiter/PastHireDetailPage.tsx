import React from 'react'
import { Card } from '../../components/Card'
import {
  MailIcon,
  LinkIcon,
  CalendarIcon,
  BriefcaseIcon,
} from '../../components/icons/IconComponents'
import { useLocation, useNavigate } from 'react-router-dom'

export const PastHireDetailPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const hire = location.state.hire

  if (!hire) {
    return (
      <div className='text-center py-16'>
        <h3 className='text-lg font-medium text-gray-900'>
          No Hire Details Found
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          Please go back and select a past hire to view details.
        </p>
        <button
          onClick={() => navigate(-1)}
          className='mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover'>
          Go to Past Hires
        </button>
      </div>
    )
  }

  const { artist, jobTitle, hiredDate } = hire

  return (
    <div>
      <div className='flex items-center mb-6 gap-4'>
        <button
          onClick={() => navigate(-1)}
          className='text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors'
          aria-label='Back to Past Hires'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M19 12H5' />
            <path d='m12 19-7-7 7-7' />
          </svg>
        </button>
        <h2 className='text-3xl font-bold text-gray-900'>Past Hire Details</h2>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-8'>
          <Card>
            <div className='flex items-start space-x-6'>
              <img
                className='h-28 w-28 rounded-full object-cover ring-4 ring-white'
                src={artist.avatarUrl}
                alt={artist.name}
              />
              <div className='pt-2'>
                <h3 className='text-2xl font-bold text-gray-900'>
                  {artist.name}
                </h3>
                <p className='text-md text-gray-600 leading-relaxed mt-2'>
                  {artist.bio || 'No biography provided.'}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h4 className='text-lg font-semibold text-gray-800 mb-4'>Skills</h4>
            <div className='flex flex-wrap gap-2'>
              {artist.skills.map(skill => (
                <span
                  key={skill}
                  className='px-3 py-1.5 text-sm font-medium bg-primary-light text-primary rounded-full'>
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>

        <div className='lg:col-span-1 space-y-8'>
          <Card>
            <h4 className='text-lg font-semibold text-gray-800 mb-4'>
              Hire Information
            </h4>
            <ul className='space-y-4 text-sm'>
              <li className='flex items-start'>
                <BriefcaseIcon className='h-5 w-5 text-gray-400 mr-3 mt-1 flex-shrink-0' />
                <div>
                  <span className='text-gray-500'>Hired for</span>
                  <br />
                  <span className='text-gray-800 font-semibold'>
                    {jobTitle}
                  </span>
                </div>
              </li>
              <li className='flex items-start'>
                <CalendarIcon className='h-5 w-5 text-gray-400 mr-3 mt-1 flex-shrink-0' />
                <div>
                  <span className='text-gray-500'>Hired on</span>
                  <br />
                  <span className='text-gray-800 font-semibold'>
                    {hiredDate}
                  </span>
                </div>
              </li>
            </ul>
          </Card>
          <Card>
            <h4 className='text-lg font-semibold text-gray-800 mb-4'>
              Contact & Links
            </h4>
            <ul className='space-y-3 text-sm'>
              {artist.email && (
                <li className='flex items-center'>
                  <MailIcon className='h-5 w-5 text-gray-400 mr-3' />
                  <a
                    href={`mailto:${artist.email}`}
                    className='text-primary hover:underline'>
                    {artist.email}
                  </a>
                </li>
              )}
              {artist.portfolioUrl && (
                <li className='flex items-center'>
                  <LinkIcon className='h-5 w-5 text-gray-400 mr-3' />
                  <a
                    href={artist.portfolioUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline truncate'>
                    {artist.portfolioUrl.replace(/^https?:\/\//, '')}
                  </a>
                </li>
              )}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
