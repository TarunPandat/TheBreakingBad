import {ADD_FAV, SET_CHAR} from '../actionTypes/charactersActionTypes'

const initialState = {
  characters: [],
  fav: [],
  count: 0,
}

export default function characters(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CHAR:
      return {...state, characters: payload}
    case 'count':
      return {...state, count: state.count + 1}
    case ADD_FAV:
      let fav = state.fav
      if (state.fav.includes(payload)) {
        fav.splice(
          state.fav.indexOf(i => i === payload),
          1,
        )
      } else {
        fav?.push(payload)
      }
      return {...state, fav, count: fav?.length}
    default:
      return state
  }
}
