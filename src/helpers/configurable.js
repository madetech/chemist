import React from 'react'

export default function configurable () {
  return function (WrappedComponent) {
    return class ConfigurableWrapper extends React.Component {
      static contextTypes = {
        config: React.PropTypes.any
      }

      render () {
        return React.createElement(WrappedComponent, {
          ...this.props,
          config: this.context.config
        })
      }
    }
  }
}
