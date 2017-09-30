import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilterButton from '../FilterButton';
import ItemsListContainer, { ItemsList } from '../index';
import Item from '../../Item'
import configureStore from 'redux-mock-store'

let mockSetFilter
let mockToggleTodoComplete
let mockRemoveTodo
jest.mock('../../../logic/actions', () => ({
  setFilter: (...args) => mockSetFilter(...args),
  toggleTodoComplete: (...args) => mockToggleTodoComplete(...args),
  removeTodo: (...args) => mockRemoveTodo(...args),
}), { virtual: true })

const mockStore = configureStore([])

const defaultProps = {
  items: [],
  filterAll: () => {},
  filterComplete: () => {},
  filterIncomplete: () => {},
  toggleTodoComplete: () => {},
  removeTodo: () => {},
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('.itemsList-ul li')).toHaveLength(2);
  });

  it('Renders item component and passes toggle and remove actions', () => {
    const toggleTodoComplete = jest.fn()
    const removeTodo = jest.fn()

    const items = [{ id: 1, content: 'Test 1' }]
    const renderedItem = shallow(<ItemsList 
      {...defaultProps} 
      items={items}
      toggleTodoComplete={toggleTodoComplete}
      removeTodo={removeTodo}
    />)
    const item = renderedItem.find(Item)
    expect(item).toHaveLength(1)

    let itemProps = item.props()
    expect(typeof itemProps.toggleComplete).toEqual('function')
    expect(typeof itemProps.remove).toEqual('function')

    itemProps.toggleComplete()
    expect(toggleTodoComplete).toHaveBeenCalledWith(1)

    itemProps.remove()
    expect(removeTodo).toHaveBeenCalledWith(1)
  });

  it('renders filter button and correct handlers', () => {
    const wrapper = shallow(<ItemsList 
      {...defaultProps} 
      filterAll={() => 'all'}
      filterComplete={() => 'complete'}
      filterIncomplete={() => 'incomplete'}
    />);

    const filterButtons = wrapper.find(FilterButton)
    expect(filterButtons.length).toEqual(3)
    expect(filterButtons.at(0).props().onClick()).toEqual('all')
    expect(filterButtons.at(1).props().onClick()).toEqual('complete')
    expect(filterButtons.at(2).props().onClick()).toEqual('incomplete')

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('passes items and merged filter actions from store', () => {
    const store = mockStore({
      todos: {
        items: [1, 2, 3],
      }
    })
    mockSetFilter = filter => ({ type: 'test_set_filter', filter })
    mockToggleTodoComplete = id => ({ type: 'test_toggle_complete', id })
    mockRemoveTodo = id => ({ type: 'test_remove_todo', id })

    const wrapper = shallow(<ItemsListContainer store={store} />);

    const passedProps = wrapper.props()
    expect(passedProps.items).toEqual([1, 2, 3])

    expect(typeof passedProps.filterAll).toEqual('function')
    expect(typeof passedProps.filterComplete).toEqual('function')
    expect(typeof passedProps.filterIncomplete).toEqual('function')
    expect(typeof passedProps.toggleTodoComplete).toEqual('function')
    expect(typeof passedProps.removeTodo).toEqual('function')

    passedProps.filterAll()
    passedProps.filterComplete()
    passedProps.filterIncomplete()
    passedProps.toggleTodoComplete('id_123')
    passedProps.removeTodo('id_123')

    expect(store.getActions()).toEqual([
      { type: 'test_set_filter', filter: 'all' },
      { type: 'test_set_filter', filter: 'complete' },
      { type: 'test_set_filter', filter: 'incomplete' },
      { type: 'test_toggle_complete', id: 'id_123' },
      { type: 'test_remove_todo', id: 'id_123' },
    ])

    expect(toJson(wrapper)).toMatchSnapshot()
  })
});
