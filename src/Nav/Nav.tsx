import React, { FC } from 'react'
import './Nav.css'

export const Nav: FC<any> = () => {
	return (
		<nav>
			<ul>
				<li>
					<a href="/"  >Home</a>
				</li>
				<li>
					<a href="/other">Other</a>
				</li>
			</ul>
		</nav>
	)
}
