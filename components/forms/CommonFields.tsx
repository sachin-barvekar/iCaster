import React, { useRef } from 'react'
import FileUpload from '../FileUpload'

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  gender?: string
  city?: string
  languages?: string
  idProof?: string
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
      <div>
        <h3 className='text-xl font-bold border-b pb-2 mb-6'>
          Basic Information
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <input
              type='text'
              placeholder='Full Name'
              value={formData.fullName || ''}
              onChange={e => updateFormData({ fullName: e.target.value })}
              className='p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-transparent transition'
            />
            {errors.fullName && (
              <p className='text-red-500 text-sm mt-1'>{errors.fullName}</p>
            )}
          </div>
          <div>
            <select
              className='p-3 border border-gray-300 rounded-lg w-full bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition'
              value={formData.gender || ''}
              onChange={e => updateFormData({ gender: e.target.value })}>
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
            {errors.gender && (
              <p className='text-red-500 text-sm mt-1'>{errors.gender}</p>
            )}
          </div>
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
            <input
              type='text'
              placeholder='Languages Known (comma-separated)'
              value={formData.languages || ''}
              onChange={e => updateFormData({ languages: e.target.value })}
              className='p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-transparent transition'
            />
            {errors.languages && (
              <p className='text-red-500 text-sm mt-1'>{errors.languages}</p>
            )}
          </div>
          <div>
            <input
              placeholder='Email Address'
              value={formData.email || ''}
              onChange={e => updateFormData({ email: e.target.value })}
              className='p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-transparent transition'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type='tel'
              placeholder='Phone Number'
              value={formData.phone || ''}
              onChange={e => updateFormData({ phone: e.target.value })}
              className='p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-transparent transition'
            />
            {errors.phone && (
              <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
            )}
          </div>
          <textarea
            placeholder='Short Bio (500 characters max)'
            maxLength={500}
            className='w-full p-2 border rounded-md md:col-span-2 min-h-[100px]'></textarea>
        </div>
      </div>

      <div>
        <h3 className='text-xl font-bold border-b pb-2 mb-6'>
          Verification & Legal
        </h3>
        <div className='space-y-6'>
          <div>
            <FileUpload
              label='Upload ID Proof (Aadhar/PAN/Voter ID)'
              onFilesUploaded={files => handleFileUpload(files, 'idProof')}
              accept='image/*,.pdf'
            />
            {errors.idProof && (
              <p className='text-red-500 text-sm mt-1'>{errors.idProof}</p>
            )}
          </div>

          <div className='space-y-4 pt-4 border-t'>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  type='checkbox'
                  id='consent'
                  checked={formData.consent || false}
                  onChange={e => updateFormData({ consent: e.target.checked })}
                  className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                />
              </div>
              <label htmlFor='consent' className='ml-2 block text-sm text-gray-700'>
                I agree to the terms and conditions and privacy policy
              </label>
            </div>

            <div className='flex items-start'>
              <input
                id='marketing'
                type='checkbox'
                checked={formData.marketingConsent || false}
                onChange={e =>
                  updateFormData({ marketingConsent: e.target.checked })
                }
                className='h-4 w-4 text-primary border-gray-300 rounded mt-1 focus:ring-primary'
              />
              <label
                htmlFor='marketing'
                className='ml-3 block text-sm text-gray-900'>
                I agree to receive marketing communications from ICASTAR.
              </label>
            </div>
            <div>
              {' '}
              {errors.consent && (
                <p className='text-red-500 text-sm'>{errors.consent}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonFields
