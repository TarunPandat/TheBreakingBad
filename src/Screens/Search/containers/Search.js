import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Platform,
  ActivityIndicator,
} from 'react-native'
import {useSelector} from 'react-redux'
import apiUrl from '../../../config/apis'
import constant from '../../../constants'
import {getAuthorization} from '../../../services/apiServices'
import {addFav} from '../../../redux/actions/charactersActions'
import {useDispatch} from 'react-redux'
import Character from '../../../components/Character'

const Search = () => {
  const {goBack} = useNavigation()
  const [input, setInput] = React.useState('')
  const [characters, setCharacters] = React.useState({
    data: [],
    isLoading: true,
    error: false,
    msg: '',
  })
  const {width} = useWindowDimensions()
  const favChar = useSelector(state => state.characters.fav)
  const dispatch = useDispatch()

  const getCharacters = async () => {
    try {
      const res = await getAuthorization(
        `${apiUrl.getCharacters}?name=${input}`,
      )

      if (res?.status === 200) {
        setCharacters({
          ...characters,
          data: res?.data,
          isLoading: false,
          error: false,
          msg: '',
        })
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

  const addFavItem = id => {
    let char = [...characters.data]
    let index = char.indexOf(i => i?.char_id === id)
    char[index] = {...char[index], fav: true}
    setCharacters({...characters, data: char})
  }

  const addToFav = id => {
    dispatch(addFav(id))
    addFavItem(id)
  }

  React.useEffect(() => {
    getCharacters()
  }, [])

  React.useEffect(() => {
    getCharacters()
  }, [input])

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#4c4c4c',
          marginBottom: 30,
        }}>
        <TextInput
          style={{
            width: '80%',
            padding: 20,
            paddingTop: Platform.OS === 'ios' ? 40 : 10,
            fontSize: 30,
            color: constant.colors.White,
            fontWeight: 'normal',
          }}
          placeholder="Search"
          placeholderTextColor={'#ccc'}
          onChangeText={input => setInput(input)}
        />
        <TouchableOpacity
          onPress={goBack}
          style={{
            paddingTop: Platform.OS === 'ios' ? 30 : 0,
            paddingRight: 15,
          }}>
          <Image
            source={constant.images.cancel}
            style={{width: 20}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View>
        {characters?.isLoading ? (
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator size="small" color={constant.colors.White} />
          </View>
        ) : !characters?.data?.length ? (
          <View style={{marginHorizontal: 20}}>
            <Text style={{color: constant.colors.Green, fontSize: 20}}>
              No Character Found
            </Text>
            <Text style={{color: '#ccc', fontSize: 20}}>Try again</Text>
          </View>
        ) : (
          <Text style={{color: constant.colors.White}}>{characters?.msg}</Text>
        )}
      </View>
      <FlatList
        style={{flex: 1, marginVertical: 10}}
        data={characters?.data}
        keyExtractor={(item, i) => `${i}`}
        renderItem={({item, i}) => (
          <Character item={item} favChar={favChar} addToFav={addToFav} />
        )}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{marginVertical: 15}} />}
      />
    </View>
  )
}

export default Search
