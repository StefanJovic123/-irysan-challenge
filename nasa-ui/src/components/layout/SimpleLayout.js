import React from 'react'
import Header from 'components/ui/Header'
import View from 'views'
import Logo from 'components/ui/Logo'

const SimpleLayout = () => {
  return (
    <div className="app-layout-simple flex flex-auto flex-col min-h-screen">
      <div className="flex flex-auto min-w-0">
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <Header
            headerStart={<Logo imgClass='w-[50px]' />}
            container
            className="shadow dark:shadow-2xl"
            headerMiddle={<div className='text-xl'>Nasa App</div>}
          />
          <View pageContainerType="contained" />
        </div>
      </div>
    </div>
  )
}

export default SimpleLayout
