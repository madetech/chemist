import React from 'react'
import cssModules from 'react-css-modules'
import Helmet from 'react-helmet'
import config from '../../../config'
import styles from './style.scss'

@cssModules(styles)
export default class App extends React.Component {
  render () {
    return (
      <div>
        <Helmet {...config.app.head} />
        <div styleName="app">
          {this.props.children}
        </div>
      </div>
    )
  }
}
