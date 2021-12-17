import {createAction} from 'redux-actions'
import {ADD_FAV, SET_CHAR} from '../actionTypes/charactersActionTypes'

export const setChar = createAction(SET_CHAR)
export const addFav = createAction(ADD_FAV)
