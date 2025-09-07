import React, { useState } from 'react'
import { ArtistCategory } from '@/types'
import ActorForm from '@/components/forms/ActorForm'
import DancerForm, { DancerFormData } from '@/components/forms/DancerForm'
import CommonFields from '@/components/forms/CommonFields'
import Icon from '@/components/Icon'
import { onboardingService } from '@/services/onboardingService'

interface BaseFormData {
  category: ArtistCategory | null
  fullName: string
  email: string
  phone: string
  gender: string
  city: string
  languages: string
  [key: string]: any
}

interface ProfileFormProps {
  onNext: () => void
  onBack: () => void
  formData: BaseFormData & DancerFormData
  updateFormData: (data: Partial<BaseFormData & DancerFormData>) => void
}

const Step2_ProfileForm: React.FC<ProfileFormProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10,15}$/

    // Common fields validation
    if (!formData.fullName?.trim()) newErrors.fullName = 'Full Name is required'

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)'
    }

    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.city?.trim()) newErrors.city = 'City is required'
    if (!formData.languages?.trim())
      newErrors.languages = 'Languages known is required'

    // Verification & Legal validation
    if (!formData.idProof)
      newErrors.idProof = 'ID proof is required for verification'
    if (!formData.consent) {
      newErrors.consent = 'You must accept the terms and conditions to continue'
    }

    // Actor specific validations
    if (formData.category === ArtistCategory.Actor) {
      if (!formData.age) {
        newErrors.age = 'Age is required'
      } else if (
        isNaN(formData.age) ||
        formData.age < 1 ||
        formData.age > 120
      ) {
        newErrors.age = 'Please enter a valid age (1-120)'
      }

      if (!formData.height?.trim()) newErrors.height = 'Height is required'
      if (!formData.weight) newErrors.weight = 'Weight is required'
    }

    // Dancer specific validations
    if (formData.category === ArtistCategory.Dancer) {
      if (!formData.danceStyles?.length)
        newErrors.danceStyles = 'At least one dance style is required'
      if (!formData.experienceYears)
        newErrors.experienceYears = 'Years of experience is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const formDataToSend = new FormData()
      
      // Add all form data to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value)
        } else if (Array.isArray(value)) {
          // Handle array fields like danceStyles
          value.forEach(item => formDataToSend.append(`${key}[]`, item))
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, String(value))
        }
      })

      const result = await onboardingService.submitOnboarding(formDataToSend)
      console.log('Onboarding successful:', result.message)
    } catch (error) {
      console.error('Onboarding submission failed:', error)
      // You might want to show an error message to the user here
      setErrors(prev => ({
        ...prev,
        form: 'Failed to submit the form. Please try again.'
      }))
    }
  }

  const renderCategoryForm = () => {
    switch (formData.category) {
      case ArtistCategory.Actor:
        return (
          <ActorForm
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )
      case ArtistCategory.Dancer:
        return (
          <DancerForm
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )
      default:
        return (
          <div className='p-4 bg-amber-50 text-amber-800 rounded-lg flex items-center gap-2'>
            <Icon name='AlertTriangle' />
            Please select a category first.
          </div>
        )
    }
  }

  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-4xl mx-auto'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-2'>
        Profile Details
      </h2>
      <p className='text-gray-500 text-center mb-8'>
        Fill in your details for:{' '}
        <span className='font-bold text-primary'>{formData.category}</span>
      </p>

      <form onSubmit={handleSubmit}>
        <div className='space-y-8'>
          {renderCategoryForm()}
          <CommonFields
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        </div>

        <div className='mt-10 pt-6 border-t flex flex-col-reverse sm:flex-row justify-between items-center gap-4'>
          <button
            type='button'
            onClick={onBack}
            className='text-gray-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all w-full sm:w-auto'>
            Back
          </button>
          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            <button
              type='submit'
              className='bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-primary/90 transition-all disabled:bg-gray-300 w-full sm:w-auto'>
              Review & Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Step2_ProfileForm
