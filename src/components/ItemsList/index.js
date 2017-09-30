import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilterButton from './FilterButton'
import './styles.css';

export const ItemsList = ({ items, filterAll, filterComplete, filterIncomplete }) => {
  return (
    <div>
      <ul className="filterList_actionBar">
        <li><FilterButton onClick={filterAll} >Show all</FilterButton></li>
        <li><FilterButton onClick={filterComplete} >Show complete</FilterButton></li>
        <li><FilterButton onClick={filterIncomplete} >Show incomplete</FilterButton></li>
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
  };
};

export default connect(mapStateToProps)(ItemsList);
