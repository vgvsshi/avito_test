import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MainPage } from './pages/main'
import { StoryPage } from './pages/storyPage'
import './styles/app.scss'

const App = () => {
	return (
		<>
			<div className='header'>
				<div className='logo'>
					Hacker News
				</div>
				<div className='sublogo'>
					the latest news of the hacker world
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