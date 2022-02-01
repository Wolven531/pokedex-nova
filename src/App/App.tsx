import React, { FC, useCallback, useEffect, useState } from 'react'
import { MainClient, NamedAPIResource } from 'pokenode-ts'
import './App.css'

export const App: FC = () => {
	const api = new MainClient()

	const [isCountLoaded, setIsCountLoaded] = useState(false)
	const [pokemon, setPokemon] = useState<NamedAPIResource[]>([])
	const [totalCount, setTotalCount] = useState(0)

	const fetchPokemonCount = useCallback(async () => {
		if (isCountLoaded) {
			return Promise.resolve()
		}

		return api.pokemon
			.listPokemons(undefined, 100 * 20)
			.then((result) => {
				setTotalCount(result.count)
				setPokemon(result.results as NamedAPIResource[])
			})
			.catch((err) => {
				console.error(`Problem fetching pokemon count - ${err}`)
			})
			.finally(() => {
				setIsCountLoaded(true)
			})
	}, [api.pokemon, isCountLoaded])

	useEffect(() => {
		fetchPokemonCount()
	}, [fetchPokemonCount])

	return (
		<article className="app">
			<header>
				<h2>Pokedex Nova</h2>
			</header>
			{isCountLoaded && (
				<section>
					<div>Total count - {totalCount}</div>
					{pokemon.map(({ name, url }) => (
						<div key={url}>
							<a href={url}>{name}</a>
						</div>
					))}
				</section>
			)}
			<footer>&copy; Anthony Williams 2022</footer>
		</article>
	)
}
