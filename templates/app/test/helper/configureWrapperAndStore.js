import createHistory from 'react-router/lib/createMemoryHistory'
import { createApiClient } from 'chemist'
import configureStore from '../../shared/store'
import createTestApp from './createTestApp'
import config from '../../config'

export default function configureWrapperAndStore () {
  const apiClient = createApiClient({
    host: config.apiHost,
    port: config.apiPort
  })

  const memoryHistory = createHistory()
  const store = configureStore(memoryHistory, apiClient)
  const wrapper = createTestApp(apiClient, memoryHistory, store)

  return [wrapper, store]
}
