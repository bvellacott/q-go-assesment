import {
	ADD_ITEM,
	REMOVE_ITEM,
	TOGGLE_ITEM_COMPLETE,
	SET_FILTER,
} from '../constants'
import {
	addItem,
	removeTodo,
	toggleTodoComplete,
	setFilter,
} from '../actions'

describe('todo actions', () => {
	it('addItem', () => {
		expect(addItem('test todo')).toEqual({ type: ADD_ITEM, content: 'test todo' })
	})

	it('removeTodo', () => {
		expect(removeTodo('id_123')).toEqual({ type: REMOVE_ITEM, id: 'id_123' })
	})

	it('toggleTodoComplete', () => {
		expect(toggleTodoComplete('id_123')).toEqual({ type: TOGGLE_ITEM_COMPLETE, content: 'id_123' })
	})

	it('addItem', () => {
		expect(setFilter('complete')).toEqual({ type: SET_FILTER, filter: 'complete' })
	})
})