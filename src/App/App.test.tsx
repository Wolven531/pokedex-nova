import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(<App />)
	})

	it('renders header', () => {
		expect(comp.getByText(/Pokedex Nova/)).toBeInTheDocument()
	})

	it('matches snapshot', () => {
		expect(comp.asFragment()).toMatchSnapshot()
	})
})
