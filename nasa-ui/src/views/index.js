import React, { Suspense } from 'react'
import { Loading } from 'components/shared'
import { publicRoutes } from 'configs/routes.config'
import { Routes, Route } from 'react-router-dom'  
import PageContainer from 'components/ui/PageContainer'

const AllPages = (props) => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.key}
          path={route.path}
          element={
            <PageContainer contained {...props} {...route.meta}>
              {route.component}
            </PageContainer>
          }
        />
      ))}
    </Routes>
  )
}

const Views = (props) => {
  return (
    <Suspense fallback={<Loading loading={true} />}>
      <AllPages {...props} />
    </Suspense>
  )
}

export default Views
