import React from 'react'
import Icon from '@/components/Icon'

const jobData = [
  {
    icon: 'Mic',
    title: 'Lead Singer',
    company: 'Harmony Studios',
    location: 'Mumbai',
    pay: '₹50,000/month',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: 'Clapperboard',
    title: 'Voice Over Artist',
    company: 'SoundWave Productions',
    location: 'Delhi',
    pay: '₹35,000/project',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: 'Palette',
    title: 'Graphic Designer',
    company: 'Creative Canvas',
    location: 'Bangalore',
    pay: '₹60,000/month',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: 'Camera',
    title: 'Fashion Photographer',
    company: 'Vogue India',
    location: 'Remote',
    pay: '₹40,000/shoot',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: 'Film',
    title: 'Short Film Actor',
    company: 'Indie Flicks',
    location: 'Pune',
    pay: '₹20,000/project',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: 'Music',
    title: 'Session Guitarist',
    company: 'Melody Makers',
    location: 'Chennai',
    pay: '₹15,000/session',
    color: 'bg-pink-100 text-pink-600',
  },
]

const JobCard: React.FC<(typeof jobData)[0]> = ({
  icon,
  title,
  company,
  location,
  pay,
  color,
}) => (
  <div className='bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
    <div>
      <div className='flex items-start justify-between'>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon name={icon as any} size={24} />
        </div>
        <span className='text-xs font-semibold bg-purple-100 text-[#7C3AED] py-1 px-3 rounded-full'>
          Full-Time
        </span>
      </div>
      <h3 className='text-xl font-bold mt-4'>{title}</h3>
      <p className='text-gray-500 font-medium'>{company}</p>
    </div>
    <div className='mt-6'>
      <div className='flex items-center text-gray-600 text-sm gap-2'>
        <Icon name='MapPin' size={16} />
        <span>{location}</span>
      </div>
      <div className='flex items-center text-gray-600 text-sm gap-2 mt-2'>
        <Icon name='IndianRupee' size={16} />
        <span>{pay}</span>
      </div>
      <button className='w-full mt-4 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all'>
        Apply Now
      </button>
    </div>
  </div>
)

const FilterButton: React.FC<{ label: string; icon: any }> = ({
  label,
  icon,
}) => (
  <button className='flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm hover:bg-purple-50 transition-colors'>
    <Icon name={icon} size={18} className='text-gray-500' />
    <span className='font-medium'>{label}</span>
    <Icon name='ChevronDown' size={16} className='text-gray-400' />
  </button>
)

const Jobs: React.FC = () => {
  return (
    <div className='space-y-6'>
      <h1 className='text-4xl font-bold'>Find Your Next Gig</h1>
      <p className='text-gray-600'>
        Explore thousands of opportunities tailored for artists like you.
      </p>

      <div className='flex flex-wrap items-center gap-4'>
        <FilterButton label='Location' icon='MapPin' />
        <FilterButton label='Category' icon='LayoutGrid' />
        <FilterButton label='Payment Type' icon='Wallet' />
        <button className='flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm text-gray-500 hover:bg-purple-50 transition-colors'>
          <Icon name='SlidersHorizontal' size={18} />
          <span className='font-medium'>All Filters</span>
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {jobData.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
        {jobData.slice(0, 2).map((job, index) => (
          <JobCard
            key={index + jobData.length}
            {...job}
            title={`${job.title} II`}
          />
        ))}
      </div>

      <div className='flex justify-center items-center pt-6'>
        <nav className='flex items-center gap-2'>
          <button className='p-2 rounded-lg hover:bg-purple-100 transition-colors'>
            <Icon name='ChevronLeft' size={20} />
          </button>
          <button className='w-10 h-10 rounded-lg bg-[#7C3AED] text-white font-bold transition-colors'>
            1
          </button>
          <button className='w-10 h-10 rounded-lg hover:bg-purple-100 text-gray-600 font-bold transition-colors'>
            2
          </button>
          <button className='w-10 h-10 rounded-lg hover:bg-purple-100 text-gray-600 font-bold transition-colors'>
            3
          </button>
          <span className='font-bold text-gray-400'>...</span>
          <button className='w-10 h-10 rounded-lg hover:bg-purple-100 text-gray-600 font-bold transition-colors'>
            8
          </button>
          <button className='p-2 rounded-lg hover:bg-purple-100 transition-colors'>
            <Icon name='ChevronRight' size={20} />
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Jobs
