import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilterButton from '../FilterButton';
import { ItemsList } from '../index';
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

const defaultProps = {
  items: [],
  filterType: 'all'
};

describe('ItemsList', () => {
  let setFilter
  jest.mock('../../../logic/actions', () => {
    setFilter = (...args) => setFilter(args)
  }, { virtual: true })

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
    expect(renderedItem.find('li')).toHaveLength(2);
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
        filter: 'all',
      }
    })
    setFilter = type => type

    const wrapper = shallow(<ItemsList store={store} />);

    const passedProps = wrapper.props()
    expect(passedProps.items).toEqual([1, 2, 3])
    expect(passedProps.filter).toBeUndefined()

    expect(typeof passedProps.filterAll).toEqual('function')
    expect(typeof passedProps.filterComplete).toEqual('function')
    expect(typeof passedProps.filterIncomplete).toEqual('function')

    expect(typeof passedProps.filterAll()).toEqual('all')
    expect(typeof passedProps.filterComplete()).toEqual('complete')
    expect(typeof passedProps.filterIncomplete()).toEqual('incomplete')

    expect(toJson(wrapper)).toMatchSnapshot()
  })
});
