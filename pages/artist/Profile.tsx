import React, { useState } from 'react'
import Icon from '@/components/Icon'
import { IconName } from '@/components/Icon'

// --- DUMMY DATA ---
interface User {
  name: string
  title: string
  avatar: string
  location: string
  isVerified: boolean
  bio: string
  contact: {
    email: string
    phone: string
  }
  socials: {
    icon: IconName
    href: string
  }[]
}

const user: User = {
  name: 'Aria Sharma',
  title: 'Singer & Photographer',
  avatar: 'https://picsum.photos/seed/useravatar/200/200',
  location: 'Mumbai, India',
  isVerified: true,
  bio: 'A passionate and versatile artist with a love for capturing moments and creating melodies. With over 5 years of experience in both professional photography and vocal performance, I bring a unique blend of visual storytelling and auditory emotion to every project. My goal is to collaborate on creative endeavors that push boundaries and inspire audiences.',
  contact: {
    email: 'aria.sharma@example.com',
    phone: '+91 98765 43210',
  },
  socials: [
    { icon: 'Instagram', href: '#' },
    { icon: 'Linkedin', href: '#' },
    { icon: 'Brush', href: '#' },
    { icon: 'Twitter', href: '#' },
  ],
}

const skills = [
  'Vocals',
  'Photography',
  'Graphic Design',
  'Procreate',
  'Adobe Suite',
  'Live Performance',
]

const portfolioItems = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/p1/400/300',
    title: 'Concert Photography',
    category: 'Photography',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/p2/400/300',
    title: 'Album Cover Art',
    category: 'Graphic Design',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/p3/400/300',
    title: 'Fashion Shoot',
    category: 'Photography',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/p4/400/300',
    title: 'Acoustic Session',
    category: 'Music',
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/p5/400/300',
    title: 'Brand Illustrations',
    category: 'Graphic Design',
  },
  {
    id: 6,
    image: 'https://picsum.photos/seed/p6/400/300',
    title: 'Street Style',
    category: 'Photography',
  },
]

interface ExperienceItemData {
  role: string
  company: string
  period: string
  description: string
  icon: IconName
}

const experienceItems: ExperienceItemData[] = [
  {
    role: 'Lead Singer',
    company: 'Harmony Studios',
    period: '2022 - Present',
    description:
      'Lead vocalist for a prominent studio, involved in recording sessions for albums and commercial jingles. Collaborated with a team of producers and musicians.',
    icon: 'Mic',
  },
  {
    role: 'Freelance Photographer',
    company: 'Self-Employed',
    period: '2020 - 2022',
    description:
      'Specialized in portrait and event photography for various clients. Managed all aspects of the business from client acquisition to final delivery.',
    icon: 'Camera',
  },
  {
    role: 'Graphic Design Intern',
    company: 'Creative Canvas',
    period: '2019 - 2020',
    description:
      'Assisted the senior design team in creating digital assets for marketing campaigns and social media.',
    icon: 'Palette',
  },
]

// --- SUB-COMPONENTS ---

const SkillTag: React.FC<{ skill: string }> = ({ skill }) => (
  <span className='bg-purple-100 text-[#7C3AED] text-sm font-medium px-3 py-1 rounded-full'>
    {skill}
  </span>
)

const SocialLink: React.FC<{ icon: IconName; href: string }> = ({
  icon,
  href,
}) => (
  <a
    href={href}
    className='text-gray-400 hover:text-[#7C3AED] transition-colors'>
    <Icon name={icon} size={22} />
  </a>
)

const ProfileHeader: React.FC = () => (
  <div className='bg-white rounded-2xl shadow-lg p-6 text-center'>
    <img
      src={user.avatar}
      alt='User Avatar'
      className='w-32 h-32 rounded-full mx-auto ring-4 ring-white shadow-md'
    />
    <h1 className='text-2xl font-bold mt-4 flex items-center justify-center gap-2'>
      {user.name}
      {user.isVerified && (
        <Icon name='BadgeCheck' size={22} className='text-[#7C3AED]' />
      )}
    </h1>
    <p className='text-gray-500 font-medium'>{user.title}</p>
    <p className='text-gray-500 text-sm mt-1 flex items-center justify-center gap-1'>
      <Icon name='MapPin' size={14} /> {user.location}
    </p>

    <div className='mt-6 flex justify-center gap-4'>
      <button className='flex-1 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all'>
        Edit Profile
      </button>
      <button className='flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 transition-all'>
        Share
      </button>
    </div>

    <div className='mt-6 pt-6 border-t border-gray-100'>
      <h3 className='text-left font-bold text-lg mb-3'>Skills</h3>
      <div className='flex flex-wrap gap-2'>
        {skills.map(skill => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>
    </div>

    <div className='mt-6 pt-6 border-t border-gray-100'>
      <h3 className='text-left font-bold text-lg mb-4'>Socials</h3>
      <div className='flex justify-around items-center'>
        {user.socials.map((social, index) => (
          <SocialLink key={index} {...social} />
        ))}
      </div>
    </div>
  </div>
)

const PortfolioItem: React.FC<{ item: (typeof portfolioItems)[0] }> = ({
  item,
}) => (
  <div className='group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer'>
    <img
      src={item.image}
      alt={item.title}
      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
    />
    <div className='absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300'></div>
    <div className='absolute bottom-0 left-0 p-4 text-white'>
      <p className='text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full inline-block'>
        {item.category}
      </p>
      <h4 className='font-bold text-lg mt-1'>{item.title}</h4>
    </div>
  </div>
)

const ExperienceItem: React.FC<{ item: ExperienceItemData }> = ({ item }) => (
  <div className='flex gap-5'>
    <div className='flex flex-col items-center'>
      <div className='w-12 h-12 bg-violet-100 text-[#7C3AED] rounded-full flex items-center justify-center flex-shrink-0'>
        <Icon name={item.icon} size={24} />
      </div>
      <div className='w-px h-full bg-gray-200 mt-2'></div>
    </div>
    <div className='pb-8'>
      <p className='font-bold text-lg'>{item.role}</p>
      <p className='text-gray-600 font-medium'>
        {item.company} &bull;{' '}
        <span className='text-gray-500'>{item.period}</span>
      </p>
      <p className='mt-2 text-gray-600'>{item.description}</p>
    </div>
  </div>
)

const TabButton: React.FC<{
  label: string
  activeTab: string
  onClick: (label: string) => void
}> = ({ label, activeTab, onClick }) => (
  <button
    onClick={() => onClick(label)}
    className={`px-6 py-3 font-semibold rounded-t-lg transition-colors border-b-2 ${
      activeTab === label
        ? 'text-[#7C3AED] border-[#7C3AED]'
        : 'text-gray-500 border-transparent hover:text-[#7C3AED]'
    }`}>
    {label}
  </button>
)

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('About')
  const tabs = ['About', 'Portfolio', 'Experience']

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-xl font-bold'>About Me</h3>
              <p className='mt-2 text-gray-600 leading-relaxed'>{user.bio}</p>
            </div>
            <div>
              <h3 className='text-xl font-bold'>Contact Information</h3>
              <div className='mt-2 space-y-2'>
                <div className='flex items-center gap-3 text-gray-700'>
                  <Icon name='Mail' size={20} className='text-gray-400' />
                  <span>{user.contact.email}</span>
                </div>
                <div className='flex items-center gap-3 text-gray-700'>
                  <Icon name='Phone' size={20} className='text-gray-400' />
                  <span>{user.contact.phone}</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'Portfolio':
        return (
          <div>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-bold'>My Work</h3>
              <button className='flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white font-semibold py-2 px-4 rounded-xl shadow-sm hover:shadow-lg transition-all'>
                <Icon name='Plus' size={18} /> Add Project
              </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {portfolioItems.map(item => (
                <PortfolioItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )
      case 'Experience':
        return (
          <div>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-bold'>Work Experience</h3>
              <button className='flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white font-semibold py-2 px-4 rounded-xl shadow-sm hover:shadow-lg transition-all'>
                <Icon name='Plus' size={18} /> Add Experience
              </button>
            </div>
            <div className='relative'>
              {/* The last item doesn't need a connecting line */}
              {experienceItems.map((item, index) => (
                <div
                  key={item.role}
                  className={`${
                    index === experienceItems.length - 1 ? 'last-item' : ''
                  }`}>
                  <style>{`.last-item .flex-col > .w-px { display: none; }`}</style>
                  <ExperienceItem item={item} />
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col lg:flex-row gap-8 items-start'>
      {/* Left Column */}
      <div className='w-full lg:w-1/3 xl:w-1/4'>
        <ProfileHeader />
      </div>

      {/* Right Column */}
      <div className='w-full lg:w-2/3 xl:w-3/4 bg-white rounded-2xl shadow-lg'>
        {/* Tab Navigation */}
        <div className='border-b border-gray-200'>
          <nav className='flex'>
            {tabs.map(tab => (
              <TabButton
                key={tab}
                label={tab}
                activeTab={activeTab}
                onClick={setActiveTab}
              />
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className='p-8'>{renderTabContent()}</div>
      </div>
    </div>
  )
}

export default Profile
