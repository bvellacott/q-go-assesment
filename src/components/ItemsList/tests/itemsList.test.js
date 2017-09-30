import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilterButton from '../FilterButton';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
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
});
