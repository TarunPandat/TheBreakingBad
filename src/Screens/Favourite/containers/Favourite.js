import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import Character from '../../../components/Character'
import constant from '../../../constants'
import {addFav} from '../../../redux/actions/charactersActions'

const Favourite = () => {
  const navigation = useNavigation()
  const {goBack} = navigation
  const favChar = useSelector(state => state.characters.fav)
  const count = useSelector(state => state.characters.count)
  const characters = useSelector(state => state.characters.characters)
  const dispatch = useDispatch()

  const addToFav = id => {
    dispatch(addFav(id))
  }

  const setHeader = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={goBack} style={{justifyContent: 'center'}}>
          <Image
            source={constant.images.cancel}
            style={{width: 20, marginBottom: Platform.OS === 'ios' ? 15 : 0}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
    })
  }

  React.useEffect(() => {
    setHeader()
  }, [])

  const favCharacters = characters?.filter(i => favChar.includes(i?.char_id))

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1, marginVertical: Platform.OS === 'ios' ? 10 : 0}}
        data={favCharacters}
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

export default Favourite
