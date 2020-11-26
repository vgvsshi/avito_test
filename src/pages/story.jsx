import React, { useEffect, useState } from 'react'
import { getItem } from '../services/api'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '../styles/main.scss'

export const StoryBlock = ({ id }) => {
	const [story, setStory] = useState(null)

	useEffect(() => {
		let mounted = true
		getItem(id).then(data => {
			if (mounted) {
				setStory(data)
			}
		}).catch((e) => {
			console.log(e.message)
		})
		return () => mounted = false
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return story ? (
		<div className='story'>
			<Link to={`/news/${story.id}`} className='story__title'>
				{story.title}
			</Link>
			<div className='story__date'>
				<div className='first-date'>
					{moment(new Date(story.time * 1000)).format('ll')}
				</div>
				<div className='second-date'>
					{moment(new Date(story.time * 1000)).format('LT')}
				</div>
			</div>
			<div className='story__info'>
				<div className='story__attr'><span>Author:</span> {story.by}</div>
				<div className='story__attr'><span>The story's score:</span> {story.score}</div>
			</div>
		</div>
	) : (null)
}