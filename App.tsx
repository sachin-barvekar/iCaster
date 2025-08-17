import React from 'react'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './router/AppRouter'

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={AppRouter()} />
    </React.StrictMode>
  )
}

export default App
