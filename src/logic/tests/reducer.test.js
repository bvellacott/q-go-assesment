import reducer, { initialState } from '../reducer'
import {
  addItem,
  removeTodo,
  toggleTodoComplete,
  setFilter,
} from '../actions'

describe('reducer', () => {
  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' }
    const mockAction = { type: 'mystery-meat' }
    const result = reducer(mockState, mockAction)
    expect(result).toEqual(mockState)
  })

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' }
    const result = reducer(undefined, mockAction)
    expect(result).toEqual(initialState)
  })

  it('should add new items on ADD_ITEM', () => {
    const mockAction = addItem('Test Content')
    const result = reducer(undefined, mockAction)
    expect(result.items).toHaveLength(3)
    expect(result.items[2].id === 3)
    expect(result.items[2].content === 'Test Content')
  })

  it('should remove item on REMOVE_ITEM', () => {
    const mockAction = removeTodo(1)
    const result = reducer({
      items: [
        { id: 1 },
        { id: 2 },
      ]
    }, mockAction)
    expect(result.items).toEqual([
      { id: 2 },
    ])
  })

  it('should toggle item falsy on TOGGLE_ITEM_COMPLETE', () => {
    const toggleToComplete = toggleTodoComplete(1)
    let result = reducer({
      items: [
        { id: 1 },
        { id: 2 },
      ]
    }, toggleToComplete)
    expect(result.items).toEqual([
      { id: 1, complete: true },
      { id: 2 },
    ])

    const toggleToIncomplete = toggleTodoComplete(1)
    result = reducer(result, toggleToIncomplete)
    expect(result.items).toEqual([
      { id: 1, complete: false },
      { id: 2 },
    ])
  })

  it('should set filter on SET_FILTER', () => {
    const setFilterToComplete = setFilter('complete')
    let result = reducer({
      filter: 'all'
    }, setFilterToComplete)
    expect(result.filter).toEqual('complete')
  })
})


