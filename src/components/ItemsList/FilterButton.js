import React from 'react'

const FilterButton = ({ setFilter, children }) => (
	<button className="itemList_filterButton" onClick={setFilter}>
		{children}
	</button>)

export default FilterButton