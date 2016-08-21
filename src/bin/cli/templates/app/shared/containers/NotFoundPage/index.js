import React from 'react'
import Helmet from 'react-helmet'

export default function NotFoundPage () {
  return (
    <div>
      <Helmet title="404" />
      <h1>404</h1>
      <p>Not Found</p>
    </div>
  )
}
