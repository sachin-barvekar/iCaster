import React, { useState } from 'react'
import { ArtistCategory } from '@/types'
import CommonFields from '@/components/forms/CommonFields'
import { onboardingService } from '@/services/onboardingService'
import { useNavigate } from 'react-router-dom'

interface BaseFormData {
  category: ArtistCategory | null
  artistTypeId?: string | null
  gender: string
  city: string

  languages: string[] | string
  experienceYears: string | number
  dateOfBirth: string
  [key: string]: any
}

interface ProfileFormProps {
  onNext: () => void
  onBack: () => void
  formData: BaseFormData
  updateFormData: (data: Partial<BaseFormData>) => void
}

const Step2_ProfileForm: React.FC<ProfileFormProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.category) newErrors.category = 'Artist type is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.city?.trim()) newErrors.city = 'City is required'


    const langs = Array.isArray(formData.languages)
      ? formData.languages
      : (formData.languages || '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
    if (!langs.length) newErrors.languages = 'Languages known is required'

    const exp = Number(formData.experienceYears)
    if (Number.isNaN(exp) || exp < 0) newErrors.experienceYears = 'Valid years of experience is required'

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)

    try {
      // Build JSON payload instead of FormData
      const payload: Record<string, any> = {}

      Object.entries(formData).forEach(([key, value]) => {
        // Normalize enums for gender and maritalStatus to backend format
        if (key === 'gender') {
          const raw = String(value || '').trim()
          const normalized = raw.toUpperCase().replace(/\s+/g, '_')
          const allowed = ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']
          payload['gender'] = allowed.includes(normalized)
            ? normalized
            : normalized || ''
          return
        }

        // Do not send the category name; send the ID under artistTypeId
        if (key === 'category') return

        if (key === 'artistTypeId') {
          if (value !== null && value !== undefined) {
            payload['artistTypeId'] = String(value)
          }
          return
        }

        if (key === 'languages') {
          const langs = Array.isArray(value)
            ? value
            : String(value || '')
                .split(',')
                .map(s => s.trim())
                .filter(Boolean)
          payload['languages'] = langs
          return
        }

        if (key === 'experienceYears') {
          const num = Number(value)
          payload['experienceYears'] = Number.isNaN(num) ? value : num
          return
        }

        // Skip deprecated field
        if (key === 'maritalStatus') return

        if (value !== null && value !== undefined) {
          payload[key] = value
        }
      })

      const result = await onboardingService.submitOnboardingJson(payload)
      console.log('Onboarding successful:', result.message)
      navigate('/dashboard')
    } catch (error) {
      console.error('Onboarding submission failed:', error)
      setErrors(prev => ({
        ...prev,
        form: 'Failed to submit the form. Please try again.'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Removed role-specific forms; onboarding now captures only common fields

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
          {/* {renderCategoryForm()} */}
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
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className='bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-primary/90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70 w-full sm:w-auto'>
              {isSubmitting ? (
                <span className='inline-flex items-center gap-2'>
                  <span className='inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  Submitting...
                </span>
              ) : (
                'Review & Submit'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Step2_ProfileForm
