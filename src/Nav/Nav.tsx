import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

export const Nav: FC<any> = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/other">Other</Link>
				</li>
			</ul>
		</nav>
	)
}
