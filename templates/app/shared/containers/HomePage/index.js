import React from 'react'
import Helmet from 'react-helmet'
import { translate } from 'react-i18next'

@translate()
export default class HomePage extends React.Component {
  render () {
    const { t } = this.props

    return (
      <div>
        <Helmet title={t('homepage.title')} />
        <h1>{t('homepage.header')}</h1>
      </div>
    )
  }
}
