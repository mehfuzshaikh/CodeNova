import React from 'react'
import ProtectedUserRoute from '@/components/shared/ProtectedUserRoute'

const AboutPage = () => {
  return (
    <ProtectedUserRoute>
      <div>This is AboutPage</div>
    </ProtectedUserRoute>
  )
}

export default AboutPage