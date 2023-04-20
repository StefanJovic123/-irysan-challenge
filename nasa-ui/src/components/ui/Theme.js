import React from 'react'
import { ConfigProvider } from 'components/ui'
import { themeConfig } from 'configs/theme.config'

const Theme = (props) => {
  const currentTheme = {
    mode: 'light',
    ...themeConfig,
  }

  return (
    <ConfigProvider value={currentTheme}>{props.children}</ConfigProvider>
  )
}

export default Theme
