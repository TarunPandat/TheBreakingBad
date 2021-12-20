import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import Character from '../../../components/Character'
import constant from '../../../constants'
import {addFav} from '../../../redux/actions/charactersActions'

const CharacterDetail = ({route: {params: char}}) => {
  const [loading, setLoading] = React.useState(true)
  const chars = useSelector(state => state.characters.characters)
  const count = useSelector(state => state.characters.count)
  const favChar = useSelector(state => state.characters.fav)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {navigate} = navigation

  const setHeader = () => {
    navigation?.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => addToFav(char?.char_id)}>
            <Image
              source={
                favChar?.includes(char?.char_id)
                  ? constant.images.heartFilled
                  : constant.images.heart
              }
              style={{width: 30}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ),
    })
  }
  const addToFav = id => {
    dispatch(addFav(id))
  }

  const shuffled = React.useMemo(() => {
    return [...chars.sort(() => 0.5 - Math.random())]
  }, [chars])

  React.useEffect(() => {
    setHeader()
  }, [favChar?.includes(char?.char_id)])

  return (
    <ScrollView style={{flex: 1}}>
      <ImageBackground
        source={{uri: char?.img}}
        style={{height: 550}}
        resizeMode="cover"
        onLoad={() => setLoading(false)}
        blurRadius={1}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={constant.colors.White} size="large" />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <Image
              source={{uri: char?.img}}
              style={{width: 150, height: 200, borderRadius: 10}}
            />
            <Text
              style={{
                color: constant.colors.White,
                fontSize: 30,
                fontFamily: constant.fonts.RobotoBold,
                marginTop: 50,
                marginBottom: -30,
              }}>
              {char?.name}
            </Text>
          </View>
        )}
      </ImageBackground>
      <View style={{flex: 1, backgroundColor: '#000', marginTop: -120}}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: constant.colors.White,
              fontSize: 14,
              fontFamily: constant.fonts.RobotoThin,
            }}>
            {char?.nickname}
          </Text>
          <Text
            style={{
              color: constant.colors.Red,
              fontSize: 14,
              fontFamily: constant.fonts.RobotoMedium,
            }}>
            {char?.status}
          </Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: 30,
            }}>
            <View>
              <Text
                style={{
                  color: constant.colors.Green,
                  fontSize: 14,
                  fontFamily: constant.fonts.RobotoMedium,
                }}>
                Portrayed
              </Text>
              <Text
                style={{
                  color: constant.colors.White,
                  fontSize: 14,
                  fontFamily: constant.fonts.RobotoLight,
                }}>
                {char?.portrayed}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: constant.colors.White,
                  fontSize: 14,
                  fontFamily: constant.fonts.RobotoLight,
                }}>
                {char?.birthday && char?.birthday !== 'Unknown'
                  ? moment(char?.birthday).format('DD-MMM-YYYY')
                  : 'Not found'}
              </Text>
              <Image
                source={constant.images.gift}
                style={{width: 16, height: 16, marginLeft: 20}}
                resizeMode="contain"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 30,
            }}>
            <View>
              <Text
                style={{
                  color: constant.colors.Green,
                  fontSize: 14,
                  marginBottom: 15,
                  fontFamily: constant.fonts.RobotoMedium,
                }}>
                Occupation
              </Text>
              {char?.occupation?.map((occu, i) => (
                <Text
                  key={`${i}`}
                  style={{
                    color: constant.colors.White,
                    fontSize: 14,
                    fontFamily: constant.fonts.RobotoLight,
                  }}>
                  {occu}
                </Text>
              ))}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 30,
            }}>
            <View>
              <Text
                style={{
                  color: constant.colors.Green,
                  fontSize: 14,
                  marginBottom: 15,
                  fontFamily: constant.fonts.RobotoMedium,
                }}>
                Appeared in
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {char?.appearance?.map((app, i) => (
                  <Text
                    key={`${i}`}
                    style={{
                      color: constant.colors.White,
                      fontSize: 14,
                      fontFamily: constant.fonts.RobotoLight,
                      borderRadius: 10,
                      backgroundColor: '#1A1A1A',
                      padding: 5,
                      marginHorizontal: 10,
                    }}>
                    {`Season ${app}`}
                  </Text>
                ))}
              </ScrollView>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 30,
              marginBottom: 30,
            }}>
            <View>
              <Text
                style={{
                  color: constant.colors.White,
                  fontSize: 25,
                  marginBottom: 15,
                  fontFamily: constant.fonts.RobotoMedium,
                }}>
                Other Characters
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {shuffled?.map((item, i) => (
                  <Character
                    key={`${i}`}
                    item={item}
                    favChar={favChar}
                    addToFav={addToFav}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default CharacterDetail
