export default function logger () {
  return () => next => action => {
    if (__DEVELOPMENT__) {
      if (action.error) {
        console.error(action)
      } else {
        console.info(action)
      }
    }

    next(action)
  }
}
