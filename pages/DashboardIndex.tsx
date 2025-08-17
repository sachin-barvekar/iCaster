import React from 'react'
import ArtistDashboard from './artist/ArtistDashboard'
import { RecruiterDashboard } from './recruiter/RecruiterDashboard'

const DashboardIndex = () => {
  const role = localStorage.getItem('role')

  switch (role) {
    case 'artist':
      return <ArtistDashboard />
    case 'recruiter':
      return <RecruiterDashboard />
    default:
      return (
        <div className='text-center p-6'>
          No dashboard available for your role.
        </div>
      )
  }
}

export default DashboardIndex
