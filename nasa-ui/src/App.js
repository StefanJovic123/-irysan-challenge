import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Theme from 'components/ui/Theme'
import Layout from 'components/layout'
import history from './history'

function App() {
  return (
    <BrowserRouter history={history}>
      <Theme>
        <Layout />
      </Theme>
    </BrowserRouter>
  )
}

export default App
