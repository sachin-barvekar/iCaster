import apiClient from './apiClient'

export interface ApplicationRequest {
  coverLetter: string
  jobId: number
  expectedSalary: number
}

export interface ApplicationResponse {
  id?: number
  status?: string
  [key: string]: any
}

export const applicationsService = {
  async createApplication(req: ApplicationRequest): Promise<ApplicationResponse> {
    const res = await apiClient.post('/applications', req)
    return res.data
  },
}

export default applicationsService