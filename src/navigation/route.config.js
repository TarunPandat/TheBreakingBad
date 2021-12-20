import React from 'react'
import {Text} from 'react-native'
import constant from '../constants'
import {CharacterDetail} from '../Screens/CharacterDetail'
import {Favourite} from '../Screens/Favourite'
import {Home} from '../Screens/Home'
import {Search} from '../Screens/Search'

export const RoutesName = {
  Home: 'Home',
  Search: 'Search',
  Favourite: 'Favourite',
  CharacterDetail: 'CharacterDetail',
}

export const Routes = {
  Home: {
    name: RoutesName.Home,
    component: Home,
    safeArea: true,
    options: {
      title: '',
      headerTitleAlign: 'left',
      headerStyle: {backgroundColor: constant.colors.Dark, elevation: 0},
      headerTintColor: constant.colors.White,
      headerLeft: () => (
        <Text
          style={{
            fontSize: 20,
            color: constant.colors.White,
            fontFamily: constant.fonts.RobotoBold,
          }}>
          The Breaking bad
        </Text>
      ),
    },
  },
  Search: {
    name: RoutesName.Search,
    component: Search,
    safeArea: false,
    options: {headerShown: false},
  },
  Favourite: {
    name: RoutesName.Favourite,
    component: Favourite,
    safeArea: false,
    options: {
      title: '',
      headerTitleAlign: 'left',
      headerStyle: {backgroundColor: constant.colors.Dark, elevation: 0},
      headerTintColor: constant.colors.Green,
      headerLeft: () => (
        <Text
          style={{
            fontSize: 20,
            color: constant.colors.Green,
            fontFamily: constant.fonts.RobotoBold,
          }}>
          Favourites
        </Text>
      ),
    },
  },
  CharacterDetail: {
    name: RoutesName.Favourite,
    component: CharacterDetail,
    safeArea: false,
    options: {
      title: '',
      headerTitleAlign: 'left',
      headerTintColor: constant.colors.White,
      headerTransparent: true,
    },
  },
}
