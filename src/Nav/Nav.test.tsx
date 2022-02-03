import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, RenderResult } from '@testing-library/react'
import { Nav } from './Nav'

describe('Nav', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(
			<MemoryRouter initialEntries={['/']} initialIndex={0}>
				<Nav />
			</MemoryRouter>,
		)
	})

	it('matches snapshot', () => {
		expect(comp.asFragment()).toMatchSnapshot()
	})
})
