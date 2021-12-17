import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './src/navigation'
import configStore from './src/redux'

const { store, persistor } = configStore()


const App = () => {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
      <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App
