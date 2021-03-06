import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import FilterButton from '../FilterButton'

describe('filter button', () => {
	it('Sets button text', () => {
		const wrapper = mount(<FilterButton>test filter</FilterButton>)

		const filterButton = wrapper.find('.itemList_filterButton')
		expect(filterButton.length).toEqual(1)
		expect(filterButton.text()).toEqual('test filter')

		expect(toJson(wrapper)).toMatchSnapshot()
	})

	it('calls setFilter on click', () => {
		const setFilter = jest.fn()
		const wrapper = mount(<FilterButton setFilter={setFilter} />)

		const filterButton = wrapper.find('.itemList_filterButton')
		expect(filterButton.length).toEqual(1)

		filterButton.simulate('click')
		expect(setFilter).toHaveBeenCalled()

		expect(toJson(wrapper)).toMatchSnapshot()
	})
})