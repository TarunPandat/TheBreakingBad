import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {View, Text} from 'react-native'
import constant from '../constants'
import Layout from './Layout'
import {Routes, RoutesName} from './route.config'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={RoutesName.Home} options={Routes.Home.options}>
          {props => <Layout router={Routes.Home} {...props} />}
        </Stack.Screen>
        <Stack.Screen name={RoutesName.Search} options={Routes.Search.options}>
          {props => <Layout router={Routes.Search} {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name={RoutesName.Favourite}
          options={Routes.Favourite.options}>
          {props => <Layout router={Routes.Favourite} {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name={RoutesName.CharacterDetail}
          options={Routes.CharacterDetail.options}>
          {props => <Layout router={Routes.CharacterDetail} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
