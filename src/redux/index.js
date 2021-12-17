import {applyMiddleware, createStore, compose} from 'redux'
import {persistStore} from 'redux-persist'
import rootReducer from './reducer'
import logger from 'redux-logger'

const configStore = () => {
  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger)),
  )

  const persistor = persistStore(store)

  return {
    persistor,
    store,
  }
}

export default configStore
