import React from 'react'
import {View, Text, SafeAreaView, StyleSheet} from 'react-native'
import constant from '../constants'

const Layout = ({router, ...props}) => {
  const {component: Component, safeArea} = router
  return safeArea ? (
    <SafeAreaView style={styles.container}>
      <Component {...{props, router}} />
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <Component {...{props, router}} />
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.colors.Dark,
  },
})
