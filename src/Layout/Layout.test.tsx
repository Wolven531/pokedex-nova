import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, RenderResult } from '@testing-library/react'
import { Layout } from './Layout'

describe('Layout', () => {
	let comp: RenderResult

	beforeEach(() => {
		comp = render(
			<MemoryRouter initialEntries={['/']} initialIndex={0}>
				<Layout />
			</MemoryRouter>,
		)
	})

	it('matches snapshot', () => {
		expect(comp.asFragment()).toMatchSnapshot()
	})
})
