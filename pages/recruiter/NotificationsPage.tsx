import React, { useState } from 'react'
import { Card } from '../../components/Card'
import { Notification } from '../../types'
import {
  UsersIcon,
  BriefcaseIcon,
  MailIcon,
  BellIcon,
} from '../../components/icons/IconComponents'
import { useNavigate } from 'react-router-dom'

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'applicant',
    text: 'Lana Steiner applied for Senior Product Designer.',
    time: '2m ago',
    read: false,
  },
  {
    id: 2,
    type: 'job',
    text: 'Your job post "Lead Illustrator" is expiring soon.',
    time: '1h ago',
    read: false,
  },
  {
    id: 3,
    type: 'message',
    text: 'You have a new message from John Appleseed.',
    time: '1d ago',
    read: true,
  },
  {
    id: 4,
    type: 'applicant',
    text: 'George Costanza applied for Architectural Photographer.',
    time: '2d ago',
    read: true,
  },
]

const NotificationIcon: React.FC<{
  type: Notification['type']
  className?: string
}> = ({ type, className }) => {
  switch (type) {
    case 'applicant':
      return <UsersIcon className={className} />
    case 'job':
      return <BriefcaseIcon className={className} />
    case 'message':
      return <MailIcon className={className} />
    default:
      return <BellIcon className={className} />
  }
}

export const NotificationsPage = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications)
  const navigate = useNavigate()
  const sortedNotifications = [...notifications].sort((a, b) =>
    a.read === b.read ? 0 : a.read ? 1 : -1,
  )

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex items-center mb-6 gap-4'>
        <button
          onClick={() => navigate(-1)}
          className='text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors'
          aria-label='Back to Dashboard'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M19 12H5' />
            <path d='m12 19-7-7 7-7' />
          </svg>
        </button>
        <h2 className='text-3xl font-bold text-gray-900'>All Notifications</h2>
      </div>
      <Card padding='none'>
        <ul className='divide-y divide-gray-200'>
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map(notification => (
              <li
                key={notification.id}
                className={`flex items-start px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300 ${
                  !notification.read ? 'bg-purple-50' : ''
                }`}>
                <div className='flex-shrink-0 mt-0.5'>
                  <NotificationIcon
                    type={notification.type}
                    className='h-5 w-5 text-gray-400'
                  />
                </div>
                <div className='ml-4 w-0 flex-1'>
                  <p
                    className={`text-sm leading-snug ${
                      !notification.read
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-800'
                    }`}>
                    {notification.text}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      !notification.read ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                    {notification.time}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <div className='px-6 py-16 text-center'>
              <BellIcon className='mx-auto h-12 w-12 text-gray-400' />
              <h3 className='mt-2 text-lg font-medium text-gray-900'>
                All Caught Up
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                You have no new notifications.
              </p>
            </div>
          )}
        </ul>
      </Card>
    </div>
  )
}
