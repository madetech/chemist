function captureError (error) {
  return new Promise(function (accept) {
    if (!error.response) return accept({ error })

    return error.response.json()
      .then(json => accept({ error, result: json }))
      .catch(() => accept({ error }))
  })
}

export default function requestMiddleware (helpers = {}) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { promise, type, ...rest } = action
    if (!promise) return next(action)

    const REQUEST = type
    const SUCCESS = `${type}_SUCCESS`
    const FAILURE = `${type}_FAILURE`

    next({ ...rest, type: REQUEST })

    return promise({ ...helpers, dispatch }).then(
      (result) => next({ ...rest, result, type: SUCCESS }),
      (error) => captureError(error).then(error => next({ ...rest, ...error, type: FAILURE }))
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error)
      next({ ...rest, error, type: FAILURE })
    })
  }
}
