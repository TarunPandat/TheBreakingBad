import AsyncStorage from '@react-native-community/async-storage'
import {persistCombineReducers} from 'redux-persist'
import characters from './characterReducer'

const config = {
  key: 'root',
  storage: AsyncStorage,
}

const reducers = persistCombineReducers(config, {
  characters,
})

export default reducers
