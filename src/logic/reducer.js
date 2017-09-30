import { 
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM_COMPLETE,
  SET_FILTER,
} from './constants'

let nextId = 3

export const initialState = {
  items: [
    { id: 1, content: 'Make sure items are completeable' },
    { id: 2, content: 'Add filters (Use HOC)' },
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItem = {
        id: nextId++,
        content: action.content,
      }

      return {
        ...state,
        items: [...state.items, newItem],
      }
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      }
    case TOGGLE_ITEM_COMPLETE:
      return {
        ...state,
        items: state.items.map(item => item.id === action.id ? 
          { ...item, complete: !item.complete } : item),
      }
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      }
    default:
      return state
  }
}

export default reducer
