import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { App, HomePage, NotFoundPage } from './containers'

export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="*" component={NotFoundPage} status={404} />
  </Route>
)
