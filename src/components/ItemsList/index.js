import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '../../logic/actions'
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
  filterAll: PropTypes.func.isRequired,
  filterComplete: PropTypes.func.isRequired,
  filterIncomplete: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ 
  items: state.todos.items,
})

const mapDispatchToProps = {
  setFilter: setFilter,
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  items: [],
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  filterAll: () => dispatchProps.setFilter('all'), 
  filterComplete: () => dispatchProps.setFilter('complete'), 
  filterIncomplete: () => dispatchProps.setFilter('incomplete'), 
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ItemsList);
