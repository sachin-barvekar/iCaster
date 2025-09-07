import React from 'react'
import Icon from '@/components/Icon'

const ArtistIllustration: React.FC = () => (
  <svg
    width='250'
    height='250'
    viewBox='0 0 200 200'
    className='drop-shadow-lg'>
    <g transform='translate(100 100)'>
      <path
        d='M0 -70 C40 -70, 60 -40, 60 0 C60 50, 30 70, 0 80 C-30 70, -60 50, -60 0 C-60 -40, -40 -70, 0 -70'
        fill='#FEF3C7'
      />
      <path
        d='M-35 -10 Q-20 -40 0 -40 Q20 -40 35 -10'
        stroke='#F59E0B'
        strokeWidth='4'
        fill='none'
        strokeLinecap='round'
      />
      <circle cx='-20' cy='10' r='4' fill='#1F2937' />
      <circle cx='20' cy='10' r='4' fill='#1F2937' />
      <path
        d='M-10 30 Q0 40 10 30'
        stroke='#1F2937'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
      />
      <path d='M-70 70 L-60 20 L0 -10 L60 20 L70 70 Z' fill='#FBBF24' />
      <path
        d='M0 80 Q-20 95, -40 85'
        stroke='#D97706'
        strokeWidth='3'
        fill='none'
      />
      <path
        d='M0 80 Q20 95, 40 85'
        stroke='#D97706'
        strokeWidth='3'
        fill='none'
      />
    </g>
  </svg>
)

const ProfileChecklistItem: React.FC<{ title: string; completed: boolean }> = ({
  title,
  completed,
}) => (
  <div
    className={`flex items-center p-4 rounded-2xl transition-all ${
      completed ? 'bg-amber-50' : 'bg-white'
    }`}>
    <div
      className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
        completed ? 'bg-primary' : 'bg-gray-200'
      }`}>
      <Icon
        name={completed ? 'Check' : 'X'}
        size={18}
        className={completed ? 'text-white' : 'text-gray-500'}
      />
    </div>
    <span
      className={`font-medium ${
        completed ? 'text-primary' : 'text-gray-600'
      }`}>
      {title}
    </span>
  </div>
)

const ArtistDashboard: React.FC = () => {
  const profileItems = [
    { title: 'Profile Photo', completed: true },
    { title: 'Personal Bio', completed: true },
    { title: 'Skills & Talents', completed: true },
    { title: 'Portfolio', completed: true },
    { title: 'Location', completed: true },
    { title: 'Contact Info', completed: true },
    { title: 'Social Media Links', completed: false },
    { title: 'Work Experience', completed: false },
  ]
  const completionPercentage =
    (profileItems.filter(i => i.completed).length / profileItems.length) * 100

  return (
    <div className='space-y-8'>
      <div className='bg-white rounded-2xl shadow-lg p-8 flex items-center justify-between overflow-hidden'>
        <div>
          <h1 className='text-4xl font-bold text-[#1F2937]'>
            Welcome back, Aria!
          </h1>
          <p className='mt-2 text-gray-600 max-w-md'>
            Your journey to the spotlight continues here. Complete your profile
            to get noticed by top recruiters.
          </p>
          <button className='mt-6 bg-gradient-to-r from-primary to-amber-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all'>
            View Job Matches
          </button>
        </div>
        <div className='mr-[-50px] mt-[-30px] mb-[-30px]'>
          <ArtistIllustration />
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-lg p-8'>
        <h2 className='text-2xl font-bold mb-2'>Profile Completion</h2>
        <p className='text-gray-500 mb-6'>
          A complete profile increases your visibility by 75%.
        </p>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-full bg-gray-200 rounded-full h-4'>
            <div
              className='bg-gradient-to-r from-primary to-amber-500 h-4 rounded-full transition-all duration-500'
              style={{ width: `${completionPercentage}%` }}></div>
          </div>
          <span className='font-bold text-primary'>
            {Math.round(completionPercentage)}%
          </span>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {profileItems.map(item => (
            <ProfileChecklistItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtistDashboard
