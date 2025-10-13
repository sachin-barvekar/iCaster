import api from './apiClient'

export interface OnboardingData {
  category: string
  fullName: string
  displayName: string
  bio: string
  dateOfBirth: string
  gender: string
  phone: string
  city: string
  state: string
  country: string
  pincode: string
  profilePhoto?: File
  coverPhoto?: File
  socialLinks?: {
    instagram?: string
    youtube?: string
    facebook?: string
    twitter?: string
    website?: string
  }
  skills?: string[]
  experience?: string
  languages?: string[]
  portfolio?: {
    title: string
    description: string
    media: File[]
    tags: string[]
  }[]
}

export const onboardingService = {
  async submitOnboarding(
    data: FormData,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/api/artist/onboard', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return {
        success: true,
        message: response.data.message || 'Onboarding completed successfully',
      }
    } catch (error: any) {
      console.error('Onboarding submission failed:', error)
      throw new Error(
        error.response?.data?.message ||
          'Failed to complete onboarding. Please try again.',
      )
    }
  },

  async submitOnboardingJson(
    data: any,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/artists/profile', data)
      return {
        success: true,
        message: response.data.message || 'Onboarding completed successfully',
      }
    } catch (error: any) {
      console.error('Onboarding JSON submission failed:', error)
      throw new Error(
        error.response?.data?.message ||
          'Failed to complete onboarding. Please try again.',
      )
    }
  },

  async getCategories(): Promise<
    { id: string; name: string; description: string }[]
  > {
    try {
      const response = await api.get('/api/artist/categories')
      return response.data
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      throw new Error('Failed to load categories. Please try again.')
    }
  },

  async getSkills(): Promise<{ id: string; name: string }[]> {
    try {
      const response = await api.get('/api/artist/skills')
      return response.data
    } catch (error) {
      console.error('Failed to fetch skills:', error)
      throw new Error('Failed to load skills. Please try again.')
    }
  },

  async getLanguages(): Promise<{ code: string; name: string }[]> {
    try {
      const response = await api.get('/api/artist/languages')
      return response.data
    } catch (error) {
      console.error('Failed to fetch languages:', error)
      throw new Error('Failed to load languages. Please try again.')
    }
  },

  async uploadMedia(
    file: File,
    type: 'image' | 'video' | 'audio' | 'document',
  ): Promise<{ url: string }> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await api.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (error) {
      console.error('Media upload failed:', error)
      throw new Error('Failed to upload media. Please try again.')
    }
  },
}
