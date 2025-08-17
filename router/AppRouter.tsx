import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import AuthPage from '@/pages/AuthPage'
import Auth from '@/pages/Auth'
import DashLayout from '@/layouts/DashLayout'
import { DashboardPage } from '@/pages/recruiter/DashboardPage'
import { PostJobPage } from '@/pages/recruiter/PostJobPage'
import { BrowseArtistsPage } from '@/pages/recruiter/BrowseArtistsPage'
import { ChatCreditsPage } from '@/pages/recruiter/ChatCreditsPage'
import { PastHiresPage } from '@/pages/recruiter/PastHiresPage'
import { ApplicantProfilePage } from '@/pages/recruiter/ApplicantProfilePage'
import { ApplicantsPage } from '@/pages/recruiter/ApplicantsPage'
import { ArtistProfilePage } from '@/pages/recruiter/ArtistProfilePage'
import { PastHireDetailPage } from '@/pages/recruiter/PastHireDetailPage'
import { NotificationsPage } from '@/pages/recruiter/NotificationsPage'
import { ProfilePage } from '@/pages/recruiter/ProfilePage'
import { SettingsPage } from '@/pages/recruiter/SettingsPage'

const AppRouter = () =>
  createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        {
          path: '/',
          element: <AuthPage />,
        },
        {
          path: '/auth',
          element: <Auth />,
        },
        {
          element: <DashLayout />,
          children: [
            {
              path: '/dashboard',
              element: <DashboardPage />,
            },
            {
              path: '/jobs',
              element: <PostJobPage />,
            },
            {
              path: '/artists',
              element: <BrowseArtistsPage />,
            },
            {
              path: '/chat-credits',
              element: <ChatCreditsPage />,
            },
            {
              path: '/hires',
              element: <PastHiresPage />,
            },
            {
              path: '/applicant-profile',
              element: <ApplicantProfilePage />,
            },
            {
              path: '/applicants',
              element: <ApplicantsPage />,
            },
            {
              path: '/artist-profile',
              element: <ArtistProfilePage />,
            },
            {
              path: '/past-hires',
              element: <PastHireDetailPage />,
            },
            {
              path: '/notifications',
              element: <NotificationsPage />,
            },
            {
              path: '/profile',
              element: <ProfilePage />,
            },
            {
              path: '/settings',
              element: <SettingsPage />,
            },
            {
              path: '*',
              element: <Navigate to='/' replace />,
            },
          ],
        },
      ],
    },
  ])

export default AppRouter
