import { 
	ADD_ITEM,
	REMOVE_ITEM,
	TOGGLE_ITEM_COMPLETE,
	SET_FILTER,
} from './constants'

export const addItem = content => ({ type: ADD_ITEM, content })

export const removeTodo = id => ({ type: REMOVE_ITEM, id })

export const toggleTodoComplete = id => ({ type: TOGGLE_ITEM_COMPLETE, id })

export const setFilter = filter => ({ type: SET_FILTER, filter })
