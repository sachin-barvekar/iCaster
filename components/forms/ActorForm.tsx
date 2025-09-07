import React from 'react'
import FileUpload from '../FileUpload'

interface FormProps {
  formData: any
  updateFormData: (data: any) => void
  errors?: Record<string, string>
}

const ActorForm: React.FC<FormProps> = ({
  formData,
  updateFormData,
  errors,
}) => {
  return (
    <div className='space-y-6'>
      <h3 className='text-xl font-bold border-b pb-2'>
        Actor / Actress / Model Details
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Actor Type
          </label>
          <div className='flex gap-4 mt-1 p-2 bg-gray-100 rounded-lg'>
            <label className='flex-1 text-center p-2 rounded-md cursor-pointer has-[:checked]:bg-purple-600 has-[:checked]:text-white transition-colors'>
              <input
                type='radio'
                name='actorType'
                value='skilled'
                className='sr-only'
                defaultChecked
              />{' '}
              Skilled Actor
            </label>
            <label className='flex-1 text-center p-2 rounded-md cursor-pointer has-[:checked]:bg-purple-600 has-[:checked]:text-white transition-colors'>
              <input
                type='radio'
                name='actorType'
                value='known'
                className='sr-only'
              />{' '}
              Known Actor
            </label>
          </div>
          {errors?.actorType && (
            <p className='text-red-500 text-sm mt-1'>{errors.actorType}</p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        <div>
          <input
            type='number'
            placeholder='Age'
            value={formData.age || ''}
            onChange={e => updateFormData({ age: e.target.value })}
            className='p-2 border rounded-md w-full'
          />
          {errors?.age && (
            <p className='text-red-500 text-sm mt-1'>{errors.age}</p>
          )}
        </div>

        <div>
          <input
            type='text'
            placeholder='Height (e.g., 5&apos;10")'
            value={formData.height || ''}
            onChange={e => updateFormData({ height: e.target.value })}
            className='p-2 border rounded-md w-full'
          />
          {errors?.height && (
            <p className='text-red-500 text-sm mt-1'>{errors.height}</p>
          )}
        </div>

        <div>
          <input
            type='text'
            placeholder='Weight (kg)'
            value={formData.weight || ''}
            onChange={e => updateFormData({ weight: e.target.value })}
            className='p-2 border rounded-md w-full'
          />
          {errors?.weight && (
            <p className='text-red-500 text-sm mt-1'>{errors.weight}</p>
          )}
        </div>
      </div>

      <div>
        <FileUpload
          label='Profile Images (Front, Left, Right)'
          note='No filters, no cap/headphones.'
          multiple
          onFilesUploaded={files => updateFormData({ profileImages: files })}
        />
        {errors?.profileImages && (
          <p className='text-red-500 text-sm mt-1'>{errors.profileImages}</p>
        )}
      </div>

      <div>
        <FileUpload
          label='Audition Video'
          onFilesUploaded={files => updateFormData({ auditionVideo: files })}
        />
        {errors?.auditionVideo && (
          <p className='text-red-500 text-sm mt-1'>{errors.auditionVideo}</p>
        )}
      </div>
    </div>
  )
}

export default ActorForm
