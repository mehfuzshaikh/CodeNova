import ProtectedUserRoute from '@/components/shared/ProtectedUserRoute'
import React from 'react'

const DashboardPage = () => {
  return (
    <ProtectedUserRoute>
      <div>This is Dashboard</div>
    </ProtectedUserRoute>
  )
}

export default DashboardPage