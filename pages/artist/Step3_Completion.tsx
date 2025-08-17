import React from 'react'
import Icon from '@/components/Icon'
import { useNavigate } from 'react-router-dom'

interface CompletionProps {
  formData: any
}

const Step3_Completion: React.FC<CompletionProps> = ({ formData }) => {
  const navigate = useNavigate()
  const onGoToDashboard = () => {
    navigate('/dashboard')
  }
  return (
    <div className='bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto text-center'>
      <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-50'>
        <Icon name='PartyPopper' size={40} className='text-green-600' />
      </div>
      <h2 className='text-3xl font-bold mb-2 text-gray-800'>
        Congratulations, Your Profile is Ready!
      </h2>
      <p className='text-gray-600 mb-8 max-w-xl mx-auto'>
        ICASTAR will now start matching your profile with recruiters and
        auditions. Keep an eye on your dashboard for updates.
      </p>

      <div className='flex flex-col sm:flex-row justify-center gap-4'>
        <button
          onClick={onGoToDashboard}
          className='bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-all'>
          Go to Dashboard
        </button>
        <button className='bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all'>
          Subscribe for More Auditions
        </button>
        <button className='bg-orange-100 text-orange-700 font-bold py-3 px-6 rounded-lg hover:bg-orange-200 transition-all'>
          Promote ICASTAR
        </button>
      </div>

      <div className='mt-10 pt-6 border-t text-left'>
        <h3 className='font-bold text-lg mb-4'>Profile Summary</h3>
        <div className='p-4 bg-gray-50 rounded-lg text-sm text-gray-700'>
          <p>
            <span className='font-semibold text-gray-500'>
              Selected Category:
            </span>{' '}
            {formData.category}
          </p>
          {/* A more detailed summary would be populated from the complete formData object */}
        </div>
      </div>
    </div>
  )
}

export default Step3_Completion
