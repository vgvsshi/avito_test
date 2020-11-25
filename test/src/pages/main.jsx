import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIds } from '../services/api'
import { loadIDs } from '../redux/actions'
import { StoryBlock } from './story'
import { Loader } from '../components/loader'
import '../styles/main.scss'

export const MainPage = () => {
	const IDsList = useSelector(state => state.IDsList)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)
	const [update, setUpdate] = useState(0)

	useEffect(() => {
		let mounted = true
		setLoading(true)
		if (mounted) {
			getIds().then(data => {
				if (mounted) {
					dispatch(loadIDs(data.slice(399, 499)))
					setLoading(false)
					// setInterval(() => {
					// 	setUpdate(update + 1)
					// }, 60000)
				}
			})
		}
		return () => mounted = false
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [update])

	return !loading ? (
		<div className='wrapper'>
			<div className='container'>
				<div className='story-list'>
					{IDsList.map(storyId => {
						return <StoryBlock key={storyId} id={storyId} />
					})}
					<button onClick={() => { setUpdate(update + 1) }} className='refresh'>Refresh news</button>
				</div>
			</div>
		</div>
	) : (<Loader />)
}
