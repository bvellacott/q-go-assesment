import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Item from '..'

describe('Item component', () => {
	const requiredProps = {}

	it('renders content span with content', () => {
		const wrapper = mount(<Item {...requiredProps} content="test todo"/>)

		const contentElement = wrapper.find('.item_content')
		expect(contentElement.length).toEqual(1)
		expect(contentElement.text()).toEqual('test todo')

		expect(toJson(wrapper)).toMatchSnapshot()
	})

	it('calls remove() when remove button clicked', () => {
		const remove = jest.fn()
		const wrapper = mount(<Item {...requiredProps} remove={remove}/>)

		const removeButton = wrapper.find('.item_removeButton')
		expect(removeButton.length).toEqual(1)

		removeButton.simulate('click')
		expect(remove).toHaveBeenCalled()

		expect(toJson(wrapper)).toMatchSnapshot()
	})

	it('calls toggleComplete() when toggle complete button clicked', () => {
		const toggleComplete = jest.fn()
		const wrapper = mount(<Item {...requiredProps} toggleComplete={toggleComplete}/>)

		const toggleCompleteButton = wrapper.find('.item_toggleCompleteButton')
		expect(toggleCompleteButton.length).toEqual(1)

		toggleCompleteButton.simulate('click')
		expect(toggleComplete).toHaveBeenCalled()

		expect(toJson(wrapper)).toMatchSnapshot()
	})

	it('does not render remove or toggleComplete button when handlers not passed', () => {
		const wrapper = mount(<Item {...requiredProps}/>)

		const removeButton = wrapper.find('.item_removeButton')
		expect(removeButton.length).toEqual(0)

		const toggleCompleteButton = wrapper.find('.item_toggleCompleteButton')
		expect(toggleCompleteButton.length).toEqual(0)

		expect(toJson(wrapper)).toMatchSnapshot()
	})

	it('renders complete class when complete', () => {
		const wrapper = mount(<Item {...requiredProps} complete={true}/>)
		const itemElement = wrapper.find('.item.item_complete')
		expect(itemElement.length).toEqual(1)

		expect(toJson(wrapper)).toMatchSnapshot()
	})

	it('renders incomplete class when incomplete', () => {
		const wrapper = mount(<Item {...requiredProps} complete={false}/>)
		const itemElement = wrapper.find('.item.item_incomplete')
		expect(itemElement.length).toEqual(1)

		expect(toJson(wrapper)).toMatchSnapshot()
	})
})
