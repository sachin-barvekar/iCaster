import React from 'react'
import { ArtistCategory } from '@/types'
import ActorForm from '@/components/forms/ActorForm'
import DancerForm from '@/components/forms/DancerForm'
import CommonFields from '@/components/forms/CommonFields'
import Icon from '@/components/Icon'

interface ProfileFormProps {
  onNext: () => void
  onBack: () => void
  formData: { category: ArtistCategory | null; [key: string]: any }
  updateFormData: (data: any) => void
}

const Step2_ProfileForm: React.FC<ProfileFormProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  const renderCategoryForm = () => {
    switch (formData.category) {
      case ArtistCategory.Actor:
        return <ActorForm formData={formData} updateFormData={updateFormData} />
      case ArtistCategory.Dancer:
        return (
          <DancerForm formData={formData} updateFormData={updateFormData} />
        )
      // Add cases for all other categories. For brevity, they return a placeholder.
      case ArtistCategory.Director:
      case ArtistCategory.Writer:
      case ArtistCategory.Makeup:
      case ArtistCategory.Singer:
      case ArtistCategory.Musician:
      case ArtistCategory.Comedian:
      case ArtistCategory.Band:
      case ArtistCategory.DJ_RJ:
        return (
          <div className='p-4 bg-gray-100 rounded-lg text-center text-gray-600'>
            Form for <span className='font-bold'>{formData.category}</span>{' '}
            would be displayed here.
          </div>
        )
      default:
        return (
          <div className='p-4 bg-yellow-100 text-yellow-800 rounded-lg flex items-center gap-2'>
            <Icon name='AlertTriangle' />
            Please select a category first.
          </div>
        )
    }
  }

  const isFormValid = true // Placeholder for actual form validation logic

  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-4xl mx-auto'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-2'>
        Profile Details
      </h2>
      <p className='text-gray-500 text-center mb-8'>
        Fill in your details for:{' '}
        <span className='font-bold text-purple-700'>{formData.category}</span>
      </p>

      <form
        onSubmit={e => {
          e.preventDefault()
          onNext()
        }}>
        <div className='space-y-8'>
          {renderCategoryForm()}
          <CommonFields formData={formData} updateFormData={updateFormData} />
        </div>

        <div className='mt-10 pt-6 border-t flex flex-col-reverse sm:flex-row justify-between items-center gap-4'>
          <button
            type='button'
            onClick={onBack}
            className='text-gray-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all w-full sm:w-auto'>
            Back
          </button>
          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            <button
              type='button'
              className='text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-purple-50 transition-all w-full sm:w-auto'>
              Save Draft
            </button>
            <button
              type='submit'
              disabled={!isFormValid}
              className='bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-purple-700 transition-all disabled:bg-gray-300 w-full sm:w-auto'>
              Review & Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Step2_ProfileForm
