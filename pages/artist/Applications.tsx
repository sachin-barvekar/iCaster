import React from 'react'
import Icon from '@/components/Icon'

type Status = 'Applied' | 'Interview' | 'Rejected' | 'Offer'

const applications = [
  {
    title: 'Lead Singer',
    company: 'Harmony Studios',
    date: '15 Jul 2025',
    status: 'Interview' as Status,
    logo: 'https://picsum.photos/seed/app1/40/40',
  },
  {
    title: 'Voice Over Artist',
    company: 'SoundWave Productions',
    date: '12 Jul 2025',
    status: 'Applied' as Status,
    logo: 'https://picsum.photos/seed/app2/40/40',
  },
  {
    title: 'Dancer',
    company: 'Groove Factory',
    date: '10 Jul 2025',
    status: 'Rejected' as Status,
    logo: 'https://picsum.photos/seed/app3/40/40',
  },
  {
    title: 'Actor for TVC',
    company: 'AdWorld',
    date: '05 Jul 2025',
    status: 'Applied' as Status,
    logo: 'https://picsum.photos/seed/app4/40/40',
  },
  {
    title: 'Illustrator',
    company: 'DesignCo',
    date: '01 Jul 2025',
    status: 'Offer' as Status,
    logo: 'https://picsum.photos/seed/app5/40/40',
  },
]

const StatusTag: React.FC<{ status: Status }> = ({ status }) => {
  const statusStyles = {
    Applied: 'bg-blue-100 text-blue-800',
    Interview: 'bg-yellow-100 text-yellow-800',
    Rejected: 'bg-red-100 text-red-800',
    Offer: 'bg-green-100 text-green-800',
  }
  return (
    <span
      className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  )
}

const Applications: React.FC = () => {
  return (
    <div className='space-y-6'>
      <h1 className='text-4xl font-bold'>My Applications</h1>
      <p className='text-gray-600'>
        Keep track of all your job applications in one place.
      </p>

      <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
        <table className='w-full text-left'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='p-5 font-semibold text-gray-600'>Job Title</th>
              <th className='p-5 font-semibold text-gray-600'>Company</th>
              <th className='p-5 font-semibold text-gray-600'>Date Applied</th>
              <th className='p-5 font-semibold text-gray-600'>Status</th>
              <th className='p-5 font-semibold text-gray-600'></th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {applications.map((app, index) => (
              <tr key={index} className='hover:bg-gray-50 transition-colors'>
                <td className='p-5'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={app.logo}
                      alt={app.company}
                      className='w-10 h-10 rounded-lg'
                    />
                    <div>
                      <p className='font-bold'>{app.title}</p>
                    </div>
                  </div>
                </td>
                <td className='p-5 text-gray-700'>{app.company}</td>
                <td className='p-5 text-gray-700'>{app.date}</td>
                <td className='p-5'>
                  <StatusTag status={app.status} />
                </td>
                <td className='p-5 text-right'>
                  <button className='text-gray-400 hover:text-[#7C3AED]'>
                    <Icon name='MoreHorizontal' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Applications
