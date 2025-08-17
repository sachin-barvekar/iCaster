import React, { useState } from 'react'
import { Card } from '../../components/Card'
import { Artist, Page } from '../../types'
import { SearchIcon } from '../../components/icons/IconComponents'
import { Pagination } from '../../components/Pagination'
import { useNavigate } from 'react-router-dom'

const artists: Artist[] = [
  {
    id: 1,
    name: 'Leo Rivera',
    avatarUrl: 'https://picsum.photos/seed/leo/300/300',
    bio: '3D artist specializing in character modeling and environment design.',
    skills: ['Blender', 'ZBrush', 'Substance Painter'],
    email: 'leo.rivera@example.com',
    portfolioUrl: 'https://artstation.com/leo',
  },
  {
    id: 2,
    name: 'Sofia Chen',
    avatarUrl: 'https://picsum.photos/seed/sofia/300/300',
    bio: 'Illustrator and animator with a passion for vibrant storytelling.',
    skills: ['Procreate', 'After Effects', 'Illustration'],
    email: 'sofia.chen@example.com',
    portfolioUrl: 'https://behance.net/sofia',
  },
  {
    id: 3,
    name: 'David Kim',
    avatarUrl: 'https://picsum.photos/seed/david/300/300',
    bio: 'Brand strategist and designer focused on creating memorable identities.',
    skills: ['Branding', 'Figma', 'Typography'],
    email: 'david.kim@example.com',
    portfolioUrl: 'https://dribbble.com/david',
  },
  {
    id: 4,
    name: 'Chloe Bailey',
    avatarUrl: 'https://picsum.photos/seed/chloe/300/300',
    bio: 'Web developer and UI designer creating beautiful, intuitive interfaces.',
    skills: ['React', 'UI/UX', 'Tailwind CSS'],
    email: 'chloe.bailey@example.com',
    portfolioUrl: 'https://github.com/chloe',
  },
  {
    id: 5,
    name: 'Marcus Jones',
    avatarUrl: 'https://picsum.photos/seed/marcus/300/300',
    bio: 'Photographer capturing stunning landscapes and portraits.',
    skills: ['Photography', 'Lightroom', 'Photoshop'],
    email: 'marcus.jones@example.com',
    portfolioUrl: 'https://unsplash.com/marcus',
  },
  {
    id: 6,
    name: 'Isabella Rossi',
    avatarUrl: 'https://picsum.photos/seed/isabella/300/300',
    bio: 'Motion graphics artist bringing brands to life through animation.',
    skills: ['Cinema 4D', 'Motion Graphics', 'Redshift'],
    email: 'isabella.rossi@example.com',
    portfolioUrl: 'https://vimeo.com/isabella',
  },
  {
    id: 7,
    name: 'Omar Gonzalez',
    avatarUrl: 'https://picsum.photos/seed/omar/300/300',
    bio: 'Game developer focused on indie titles with unique mechanics.',
    skills: ['Unity', 'C#', 'Game Design'],
    email: 'omar.gonzalez@example.com',
    portfolioUrl: 'https://itch.io/omar',
  },
  {
    id: 8,
    name: 'Freya Schmidt',
    avatarUrl: 'https://picsum.photos/seed/freya/300/300',
    bio: 'A concept artist who creates breathtaking worlds for films and games.',
    skills: ['Photoshop', 'Concept Art', 'World Building'],
    email: 'freya.schmidt@example.com',
    portfolioUrl: 'https://artstation.com/freya',
  },
  {
    id: 9,
    name: 'Kenji Tanaka',
    avatarUrl: 'https://picsum.photos/seed/kenji/300/300',
    bio: 'Minimalist graphic designer with a love for clean typography.',
    skills: ['Graphic Design', 'InDesign', 'Minimalism'],
    email: 'kenji.tanaka@example.com',
    portfolioUrl: 'https://kenji.design',
  },
]

const ArtistCard: React.FC<{ artist: Artist; onViewProfile: () => void }> = ({
  artist,
  onViewProfile,
}) => (
  <Card className='flex flex-col text-center items-center hover:-translate-y-1 transition-transform'>
    <img
      className='w-24 h-24 rounded-full mb-4 object-cover ring-2 ring-offset-2 ring-gray-100'
      src={artist.avatarUrl}
      alt={artist.name}
    />
    <h3 className='text-lg font-bold text-gray-900'>{artist.name}</h3>
    <p className='text-sm text-gray-500 mt-1 flex-grow'>{artist.bio}</p>
    <div className='mt-4 flex flex-wrap gap-2 justify-center'>
      {artist.skills.map(skill => (
        <span
          key={skill}
          className='px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md'>
          {skill}
        </span>
      ))}
    </div>
    <button
      onClick={onViewProfile}
      className='mt-6 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors'>
      View Profile
    </button>
  </Card>
)

export const BrowseArtistsPage= () => {
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6
  const navigate = useNavigate()

  const handleViewProfile = (artist: Artist) => {
    navigate('/artist-profile', { state: { artist } })
  }

  const indexOfLastArtist = currentPage * ITEMS_PER_PAGE
  const indexOfFirstArtist = indexOfLastArtist - ITEMS_PER_PAGE
  const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist)

  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6'>
        <h2 className='text-3xl font-bold text-gray-900'>Browse Artists</h2>
        <div className='flex gap-2 items-center'>
          <div className='relative w-full md:max-w-xs'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary'
              placeholder='Search by skill...'
            />
          </div>
          <button className='px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 whitespace-nowrap'>
            Filters
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {currentArtists.map(artist => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onViewProfile={() => handleViewProfile(artist)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={artists.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={page => setCurrentPage(page)}
        className='mt-8'
      />
    </div>
  )
}
