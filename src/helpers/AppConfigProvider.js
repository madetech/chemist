import React, { Children, PropTypes } from 'react'

export default class AppConfigProvider extends React.Component {
  static propTypes = {
    config: PropTypes.any
  }

  static defaultProps = {
    config: {}
  }

  static childContextTypes = {
    config: PropTypes.any
  }

  constructor (props, context) {
    super(props, context)
    this.config = props.config
  }

  getChildContext () {
    return { config: this.config }
  }

  render () {
    return Children.only(this.props.children)
  }
}
