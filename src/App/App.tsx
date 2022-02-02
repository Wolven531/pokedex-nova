import React, { FC, useCallback, useEffect, useState } from 'react'
import { MainClient, NamedAPIResource } from 'pokenode-ts'
import './App.css'
import { MAX_NUM_POKEMON } from '../constants'

export const App: FC = () => {
	const api = new MainClient()

	const [isLoaded, setIsCountLoaded] = useState(false)
	const [pokemon, setPokemon] = useState<NamedAPIResource[]>([])
	const [totalCount, setTotalCount] = useState(0)

	/**
	 * This method uses the PokeAPI client to
	 *   - retrieve all pokemon entries
	 *   - update `totalCount` for rendering
	 *   - sets the component to loaded when successful
	 *
	 * If aready loaded, this method simply resolves
	 */
	const fetchPokemonCount = useCallback(
		(): Promise<void> =>
			isLoaded
				? Promise.resolve()
				: api.pokemon
						.listPokemons(undefined, MAX_NUM_POKEMON)
						.then((result) => {
							setTotalCount(result.count)
							setPokemon(result.results as NamedAPIResource[])
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
			<header>
				<h2>Pokedex Nova</h2>
			</header>
			{isLoaded && (
				<section>
					<div>Total count - {totalCount}</div>
					{pokemon.map(({ name, url }) => (
						<div key={url} className="poke-container">
							<a href={url}>{name}</a>
						</div>
					))}
				</section>
			)}
			<footer>&copy; Anthony Williams 2022</footer>
		</article>
	)
}
