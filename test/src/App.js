import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MainPage } from './pages/main'
import { StoryPage } from './pages/storyPage'
import { Link } from 'react-router-dom'
import './styles/app.scss'

const App = () => {
	return (
		<>
			<div className='header'>
				<Link to='/'>
					<div className='logo'>
						Hacker News
					</div>
				</Link>
				<div className='sublogo'>
					daily news of the hacking world
				</div>
			</div>
			<Switch>
				<Route exact path='/'>
					<MainPage />
				</Route>
				<Route path='/news/:id'>
					<StoryPage />
				</Route>
			</Switch>
		</>
	)
}

export default App;