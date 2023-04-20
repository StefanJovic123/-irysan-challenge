import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container } from 'components/shared'
import {
  PAGE_CONTAINER_GUTTER_X,
  PAGE_CONTAINER_GUTTER_Y,
} from 'constants/theme.constant'
import Footer from 'components/ui/Footer'

const PageContainer = (props) => {
  const {
    pageContainerType,
    children,
    footer,
  } = props

  return (
    <div className="h-full flex flex-auto flex-col justify-between align-center align-items-center">
      <main className="h-full">
        <div
          className={classNames(
            'page-container w-full relative h-full flex flex-auto flex-col',
            pageContainerType !== 'gutterless' &&
            `${PAGE_CONTAINER_GUTTER_X} ${PAGE_CONTAINER_GUTTER_Y}`,
            pageContainerType === 'contained' && 'container mx-auto'
          )}
        >
         <Container className="h-full">
            <>{children}</>
          </Container>
        </div>
      </main>
      {footer && <Footer pageContainerType={pageContainerType} />}
    </div>
  )
}

PageContainer.defaultProps = {
  pageContainerType: 'default',
  contained: false,
  footer: true,
}

PageContainer.propTypes = {
  pageContainerType: PropTypes.oneOf(['default', 'gutterless', 'contained']),
  footer: PropTypes.bool,
}

export default PageContainer
