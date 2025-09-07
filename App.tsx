import React from 'react'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import { ToastContainer } from 'react-toastify'

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar
        aria-label={undefined}
      />
      <RouterProvider router={AppRouter()} />
    </React.StrictMode>
  )
}

export default App
