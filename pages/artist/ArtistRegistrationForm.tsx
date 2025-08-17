import React, { useState } from 'react'
import { ArtistCategory } from '@/types'
import Step1_CategorySelect from './Step1_CategorySelect'
import Step2_ProfileForm from './Step2_ProfileForm'
import Step3_Completion from './Step3_Completion'

const ArtistRegistrationForm: React.FC = () => {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState<{
    category: ArtistCategory | null
    [key: string]: any
  }>({
    category: null,
  })

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleSubmit = () => {
    console.log('Final Data:', formData)
    // send to API here
  }

  return (
    <div>
      {step === 1 && (
        <Step1_CategorySelect
          onNext={nextStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 2 && (
        <Step2_ProfileForm
          onNext={nextStep}
          onBack={prevStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 3 && (
        <Step3_Completion
          onBack={prevStep}
          onSubmit={handleSubmit}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
    </div>
  )
}

export default ArtistRegistrationForm
