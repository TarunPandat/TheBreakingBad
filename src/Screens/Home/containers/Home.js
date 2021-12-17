import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import {useDispatch} from 'react-redux'
import apiUrl from '../../../config/apis'
import constant from '../../../constants'
import {RoutesName} from '../../../navigation/route.config'
import {getAuthorization} from '../../../services/apiServices'
import {setChar} from '../../../redux/actions/charactersActions'
import {useSelector} from 'react-redux'
import {addFav} from '../../../redux/actions/charactersActions'
import Character from '../../../components/Character'

const Home = () => {
  const navigation = useNavigation()
  const char = useSelector(state => state.characters.characters)
  const count = useSelector(state => state.characters.count)
  const favChar = useSelector(state => state.characters.fav)
  const dispatch = useDispatch()
  const {navigate} = navigation
  const [characters, setCharacters] = React.useState({
    isLoading: true,
    error: false,
    msg: '',
  })

  const setHeader = () => {
    navigation?.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigate(RoutesName.Search)}>
            <Image
              source={constant.images.search}
              style={{width: 30}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate(RoutesName.Favourite)}>
            <Image
              source={constant.images.heartFilled}
              style={{width: 30, marginLeft: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ),
    })
  }

  const getCharacters = async () => {
    try {
      const res = await getAuthorization(apiUrl.getCharacters)

      if (res?.status === 200) {
        setCharacters({
          ...characters,
          isLoading: false,
          error: false,
          msg: '',
        })
        dispatch(setChar(res?.data))
      } else {
        setCharacters({
          ...characters,
          isLoading: false,
          error: true,
          msg: 'Unable to get the data',
        })
      }
    } catch (error) {
      setCharacters({
        ...characters,
        isLoading: false,
        error: true,
        msg: error?.message,
      })
    }
  }

  React.useEffect(() => {
    getCharacters()
    setHeader()
  }, [])

  const addToFav = id => {
    dispatch(addFav(id))
  }
  return (
    <View style={{justifyContent: 'center', flex: 1, alignSelf: 'center'}}>
      <View style={{alignItems: 'center'}}>
        {characters?.isLoading ? (
          <ActivityIndicator size="small" color={constant.colors.White} />
        ) : !char?.length ? (
          <Text style={{color: constant.colors.White}}>No Data Found</Text>
        ) : (
          <Text style={{color: constant.colors.White}}>{characters?.msg}</Text>
        )}
      </View>
      <FlatList
        style={{flex: 1, marginBottom: 10}}
        data={char}
        keyExtractor={(item, i) => `${i}`}
        renderItem={({item, i}) => {
          return (
            <Character item={item} favChar={favChar} addToFav={addToFav} />)
            
        }}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{marginVertical: 15}} />}
      />
    </View>
  )
}

export default Home
