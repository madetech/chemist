import { asyncConnect } from 'redux-connect'

export default function prefetch (cb) {
  return component => asyncConnect([{ promise: cb }]).call(null, component)
}
