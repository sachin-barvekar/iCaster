import React from 'react'
import FileUpload from '../FileUpload'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Badge } from '../ui/badge'

interface FormErrors {
  fullName?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  gender?: string
  city?: string
  maritalStatus?: string
  languages?: string
  experienceYears?: string
  dateOfBirth?: string
  idProof?: string
  passport?: string
  aadharCard?: string
  panCard?: string
  faceVerification?: string
  consent?: string
  [key: string]: string | undefined
}

interface FormProps {
  formData: any
  updateFormData: (data: any) => void
  errors?: FormErrors
}

const CommonFields: React.FC<FormProps> = ({
  formData,
  updateFormData,
  errors = {} as FormErrors,
}) => {
  const handleFileUpload = (files: FileList, field: string) => {
    if (files.length > 0) {
      const file = files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        const fileData = reader.result as string
        updateFormData({ [field]: fileData })
      }

      reader.readAsDataURL(file)
      return true
    }
    return false
  }

  return (
    <div className='space-y-8 mt-10 pt-8 border-t'>
  
      {/* Location & Demographics */}
      <div>
        <h3 className='text-xl font-bold border-b pb-2 mb-6'>
          Location & Demographics
        </h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div>
            <input
              type='text'
              placeholder='City'
              value={formData.city || ''}
              onChange={e => updateFormData({ city: e.target.value })}
              className='p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-transparent transition'
            />
            {errors.city && (
              <p className='text-red-500 text-sm mt-1'>{errors.city}</p>
            )}
          </div>
          <div>
            <select
              className='p-3 border border-gray-300 rounded-lg w-full bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition'
              value={formData.gender || ''}
              onChange={e => updateFormData({ gender: e.target.value })}>
              <option value=''>Select Gender</option>
              <option value='MALE'>Male</option>
              <option value='FEMALE'>Female</option>
              <option value='OTHER'>Other</option>
              <option value='PREFER_NOT_TO_SAY'>Prefer not to say</option>
            </select>
            {errors.gender && (
              <p className='text-red-500 text-sm mt-1'>{errors.gender}</p>
            )}
          </div>
          <div>
            <select
              className='p-3 border border-gray-300 rounded-lg w-full bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition'
              value={formData.maritalStatus || ''}
              onChange={e => updateFormData({ maritalStatus: e.target.value })}>
              <option value=''>Marital Status</option>
              <option value='SINGLE'>Single</option>
              <option value='MARRIED'>Married</option>
              <option value='DIVORCED'>Divorced</option>
              <option value='WIDOWED'>Widowed</option>
              <option value='PREFER_NOT_TO_SAY'>Prefer not to say</option>
            </select>
            {errors.maritalStatus && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.maritalStatus}
              </p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>
              Date of Birth
            </label>
            <input
              type='date'
              value={formData.dateOfBirth || ''}
              onChange={e => updateFormData({ dateOfBirth: e.target.value })}
              className='p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-transparent transition'
            />
            {errors.dateOfBirth && (
              <p className='text-red-500 text-sm mt-1'>{errors.dateOfBirth}</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills & Experience */}
      <div>
        <h3 className='text-xl font-bold border-b pb-2 mb-6'>
          Skills & Experience
        </h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div>
            {(() => {
              const availableLanguages = [
                'English',
                'Hindi',
                'Marathi',
                'Tamil',
                'Telugu',
                'Kannada',
                'Malayalam',
                'Bengali',
                'Punjabi',
                'Gujarati',
                'Urdu',
                'Odia',
                'Assamese',
              ]
              const selectedLanguages: string[] = Array.isArray(
                formData.languages,
              )
                ? formData.languages
                : (formData.languages || '')
                    .split(',')
                    .map((s: string) => s.trim())
                    .filter(Boolean)

              return (
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                    Languages Known
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-between'>
                        {selectedLanguages.length > 0
                          ? `${selectedLanguages.length} selected`
                          : 'Select languages'}
                        <span className='ml-2 text-gray-400'>▾</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-64 p-3 space-y-2 bg-white'>
                      {availableLanguages.map(lang => {
                        const checked = selectedLanguages.includes(lang)
                        return (
                          <label key={lang} className='flex items-center gap-2'>
                            <Checkbox
                              checked={checked}
                              onCheckedChange={val => {
                                const isChecked = Boolean(val)
                                const next = isChecked
                                  ? [...selectedLanguages, lang]
                                  : selectedLanguages.filter(l => l !== lang)
                                updateFormData({ languages: next })
                              }}
                            />
                            <span className='text-sm'>{lang}</span>
                          </label>
                        )
                      })}
                    </PopoverContent>
                  </Popover>
                  {selectedLanguages.length > 0 && (
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {selectedLanguages.map(lang => (
                        <Badge  variant='secondary'>
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {errors.languages && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.languages}
                    </p>
                  )}
                </div>
              )
            })()}
          </div>
          <div>
            <input
              type='number'
              placeholder='Years of Experience'
              min={0}
              max={80}
              value={formData.experienceYears || ''}
              onChange={e =>
                updateFormData({ experienceYears: e.target.value })
              }
              className='p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-transparent transition'
            />
            {errors.experienceYears && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.experienceYears}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Verification & Legal removed per onboarding requirements */}
    </div>
  )
}

export default CommonFields
