import React from 'react';
import { shallow, mount } from 'enzyme';
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

  it('renders show all filter with onClick that sets filter type "all"', () => {
    throw new Error('test not implemented')
  })

  it('renders show complete filter with onClick that sets filter type "complete"', () => {
    throw new Error('test not implemented')
  })

  it('renders show incomplete filter with onClick that sets filter type "incomplete"', () => {
    throw new Error('test not implemented')
  })
});
