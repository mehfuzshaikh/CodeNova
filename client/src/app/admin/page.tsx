import React from 'react'
import ProtectedAdminRoute from '@/components/shared/ProtectedAdminRoute'

const AdminHomePage = () => {
  return (
    <ProtectedAdminRoute>
      <h1>Admin Home Page</h1>
    </ProtectedAdminRoute>
  )
}

export default AdminHomePage