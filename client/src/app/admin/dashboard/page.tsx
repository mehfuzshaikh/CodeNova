import React from 'react'
import ProtectedAdminRoute from '@/components/shared/ProtectedAdminRoute'

const AdminDashboard = () => {
  return (
    <ProtectedAdminRoute>
      <h1>Admin Dashboard</h1>
    </ProtectedAdminRoute>
  )
}

export default AdminDashboard