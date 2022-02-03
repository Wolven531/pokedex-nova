import React, { FC, useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainClient } from 'pokenode-ts'
// import { MainClient, NamedAPIResource } from 'pokenode-ts'
import { MAX_NUM_POKEMON, NUM_FORMATTER } from '../constants'
import { Layout } from '../Layout'
import './App.css'

export const App: FC = () => {
	const api = new MainClient()

	const [isLoaded, setIsCountLoaded] = useState(false)
	// const [pokemon, setPokemon] = useState<NamedAPIResource[]>([])
	const [totalCount, setTotalCount] = useState(0)

	/**
	 * This method uses the PokeAPI client to
	 *   - retrieve all pokemon entries
	 *   - update `totalCount` for rendering
	 *   - sets the component to loaded when successful
	 *
	 * If already loaded, this method simply resolves
	 */
	const fetchPokemonCount = useCallback(
		(): Promise<void> =>
			isLoaded
				? Promise.resolve()
				: api.pokemon
						.listPokemons(undefined, MAX_NUM_POKEMON)
						.then((result) => {
							setTotalCount(result.count)
							// setPokemon(result.results as NamedAPIResource[])
						})
						.catch((err) => {
							console.error(
								`Problem fetching pokemon count - ${err}`,
							)
						})
						.finally(() => {
							setIsCountLoaded(true)
						}),
		[isLoaded],
	)

	useEffect(() => {
		fetchPokemonCount()
	}, [fetchPokemonCount])

	return (
		<article className="app">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route
							element={
								<>
									{!isLoaded && <div>Loading...</div>}
									{isLoaded && (
										<div>
											Total pokemon count -{' '}
											{NUM_FORMATTER.format(totalCount)}
										</div>
										// {pokemon.map(({ name, url }) => (
										// 	<div key={url} className="poke-container">
										// 		<a href={url}>{name}</a>
										// 	</div>
										// ))}
									)}
								</>
							}
							index
						></Route>
						<Route element={<div>Other</div>} path="other"></Route>
						{/* Not Found below */}
						<Route element={<div>Not Found</div>} path="*"></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</article>
	)
}
