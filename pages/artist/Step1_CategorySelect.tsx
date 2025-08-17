import React, { useState } from 'react'
import { ArtistCategory } from '@/types'
import Icon, { IconName } from '@/components/Icon'
import { useNavigate } from 'react-router-dom'

interface CategorySelectProps {
  onNext: () => void
  updateFormData: (data: { category: ArtistCategory }) => void
}

const categories: {
  name: ArtistCategory
  icon: IconName
  description: string
}[] = [
  {
    name: ArtistCategory.Actor,
    icon: 'User',
    description: 'Acting, modeling, and performance roles.',
  },
  {
    name: ArtistCategory.Dancer,
    icon: 'PersonStanding',
    description: 'For dancers and choreographers.',
  },
  {
    name: ArtistCategory.Director,
    icon: 'Clapperboard',
    description: 'Film, TV, and stage directors.',
  },
  {
    name: ArtistCategory.Writer,
    icon: 'PenSquare',
    description: 'Screenwriters, lyricists, and more.',
  },
  {
    name: ArtistCategory.Makeup,
    icon: 'Paintbrush2',
    description: 'Makeup artists and hair stylists.',
  },
  {
    name: ArtistCategory.Singer,
    icon: 'Mic',
    description: 'Vocalists and singers of all genres.',
  },
  {
    name: ArtistCategory.Musician,
    icon: 'Music',
    description: 'Instrumentalists and musicians.',
  },
  {
    name: ArtistCategory.Comedian,
    icon: 'Smile',
    description: 'Stand-up comedians and performers.',
  },
  {
    name: ArtistCategory.Band,
    icon: 'Users',
    description: 'For music bands and groups.',
  },
  {
    name: ArtistCategory.DJ_RJ,
    icon: 'Disc3',
    description: 'DJs and Radio Jockeys.',
  },
]

const CategoryCard: React.FC<{
  category: (typeof categories)[0]
  isSelected: boolean
  onSelect: () => void
}> = ({ category, isSelected, onSelect }) => (
  <div
    role='button'
    aria-pressed={isSelected}
    tabIndex={0}
    className={`relative group p-4 border-2 rounded-2xl text-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
      isSelected
        ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
        : 'border-gray-200 bg-white hover:border-purple-400 hover:shadow-md'
    }`}
    onClick={onSelect}
    onKeyDown={e => e.key === 'Enter' && onSelect()}>
    <Icon
      name={category.icon}
      size={40}
      className='mx-auto text-purple-600 mb-3'
    />
    <h3 className='font-bold text-sm text-gray-800 leading-tight'>
      {category.name}
    </h3>
    <div className='absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2'>
      <p className='text-white text-xs font-medium'>{category.description}</p>
    </div>
  </div>
)

const Step1_CategorySelect: React.FC<CategorySelectProps> = ({
  onNext,
  updateFormData,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ArtistCategory | null>(null)
  const navigate = useNavigate()

  const handleSelect = (category: ArtistCategory) => {
    setSelectedCategory(category)
  }

  const handleContinue = () => {
    if (selectedCategory) {
      updateFormData({ category: selectedCategory })
      onNext()
    }
  }

  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-5xl mx-auto'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-2'>
        Choose your artist category
      </h2>
      <p className='text-gray-500 text-center mb-8'>
        Select the category that best represents you.
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
        {categories.map(cat => (
          <CategoryCard
            key={cat.name}
            category={cat}
            isSelected={selectedCategory === cat.name}
            onSelect={() => handleSelect(cat.name)}
          />
        ))}
      </div>

      <div className='mt-10 text-center'>
        <button
          onClick={handleContinue}
          disabled={!selectedCategory}
          className='bg-purple-600 text-white font-bold py-3 px-12 rounded-lg shadow-md hover:bg-purple-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none'>
          Continue
        </button>
      </div>
    </div>
  )
}

export default Step1_CategorySelect
