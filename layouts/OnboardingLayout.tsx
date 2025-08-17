// src/layouts/OnboardingLayout.tsx
import { Outlet } from 'react-router-dom'
import Stepper from '@/components/Stepper'

export default function OnboardingLayout() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800 p-4 sm:p-8'>
      <div className='max-w-6xl mx-auto'>
        <header className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-purple-700 tracking-wider'>
            ICASTAR
          </h1>
          <p className='text-gray-500'>Be a Findix - Artist Onboarding</p>
        </header>
        {/* you can read current step from location or state */}
        <Stepper currentStep={1} />
        <main className='mt-8'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
