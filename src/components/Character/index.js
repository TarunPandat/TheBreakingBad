import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import constant from '../../constants'
import {RoutesName} from '../../navigation/route.config'

const Character = ({item, addToFav, favChar}) => {
  const {width} = useWindowDimensions()

  const {navigate} = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigate(RoutesName.CharacterDetail, item)}
      style={{
        width: width * 0.5,
        height: 310,
        paddingHorizontal: 15,
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: item?.img}}
          style={{borderRadius: 10, width: '100%', height: 250}}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text
            style={{
              color: constant.colors.White,
              fontSize: 16,
              marginVertical: 10,
              fontFamily: constant.fonts.RobotoBold,
            }}>
            {item?.name}
          </Text>
          <Text
            style={{
              color: constant.colors.White,
              fontSize: 14,
              fontFamily: constant.fonts.RobotoLight,
            }}>
            {item?.nickname}
          </Text>
        </View>
        <TouchableOpacity onPress={() => addToFav(item?.char_id)}>
          <Image
            source={
              favChar?.includes(item?.char_id) || item?.fav
                ? constant.images.heartFilled
                : constant.images.heart
            }
            style={{marginVertical: 10}}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default Character
