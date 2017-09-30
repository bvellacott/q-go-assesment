import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

export const ItemsList = ({ items }) => {
  return (
    <div>
      <ul className"filterList_actionBar">
        <li></li>
        <li></li>
      </ul>
      <ul className={'itemsList-ul'}>
        {items.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}
        {items.map(item => <li key={item.id}>{item.content}</li>)}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return { 
    items: state.todos.items,
    filter: satet.todos.filter,
  };
};

export default connect(mapStateToProps)(ItemsList);
