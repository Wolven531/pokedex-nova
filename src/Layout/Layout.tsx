import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '../Nav'

export interface ILayoutProps {}

export const Layout: FC<ILayoutProps> = () => {
	return (
		<>
			<header>
				<h2>Pokedex Nova</h2>
			</header>
			<Nav />
			<section>
				<Outlet />
			</section>
			<footer>&copy; Anthony Williams 2022</footer>
		</>
	)
}
