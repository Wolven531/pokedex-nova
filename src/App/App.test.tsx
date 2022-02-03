import React from 'react'
import { render, RenderResult, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

// !!! this did NOT work due to jest Mock
// const mockListPokemons = jest.fn().mockResolvedValue({
// 	count: 99,
// })
// !!! this did NOT work due to jest Mock
// const mockListPokemons = jest.fn(() => Promise.resolve({ count: 99 }))

// !!! this ruins the loading snapshot
// const FAKE_COUNT = 99

// MUST mock BEFORE importing App
// jest.mock('pokenode-ts', () => {
// 	return {
// 		MainClient: function () {
// 			return {
// 				pokemon: {
// 					// listPokemons: mockListPokemons,
// 					listPokemons: () => Promise.resolve({ count: FAKE_COUNT }),
// 				},
// 			}
// 		},
// 	}
// })
import { App } from './App'

describe('App', () => {
	let comp: RenderResult

	beforeEach(() => {
		// TODO - mock network (NOT poke client)

		act(() => {
			comp = render(<App />)
		})
	})

	it('matches snapshot', () => {
		expect(comp.asFragment()).toMatchSnapshot()
	})

	describe('when loaded', () => {
		beforeEach(async () => {
			await waitFor(
				() => comp.getByText(/Total pokemon count -/),
				// () => comp.getByText(`Total pokemon count - ${FAKE_COUNT}`),
			)
		})

		it('renders header', () => {
			expect(comp.getByText(/Pokedex Nova/)).toBeInTheDocument()
		})

		it('matches snapshot', () => {
			expect(comp.asFragment()).toMatchSnapshot()
		})
	})
})
