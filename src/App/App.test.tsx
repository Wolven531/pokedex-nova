import React from 'react'
import { render, RenderResult, waitFor } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
	let comp: RenderResult

	beforeEach(() => {
		// TODO - mock network / poke client

		comp = render(<App />)
	})

	it('matches snapshot', () => {
		expect(comp.asFragment()).toMatchSnapshot()
	})

	describe('when loaded', () => {
		beforeEach(async () => {
			await waitFor(() => comp.getByText(/Total pokemon count -/))
		})

		it('renders header', () => {
			expect(comp.getByText(/Pokedex Nova/)).toBeInTheDocument()
		})

		it('matches snapshot', () => {
			expect(comp.asFragment()).toMatchSnapshot()
		})
	})
})
