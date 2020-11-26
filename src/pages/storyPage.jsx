/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getItem } from '../services/api'
import { Loader } from '../components/loader'
import { Comment } from '../components/comments'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '../styles/storyPage.scss'

export const StoryPage = () => {
	const id = useParams().id
	const [story, setStory] = useState(null)
	const [update, setUpdate] = useState(0)
	const [count, setCount] = useState(0)
	const [mounted, setMount] = useState(true)

	useEffect(() => {
		if (id) {
			getItem(id).then(data => {
				if (mounted) {
					setStory(data)
				}
			})
		}
		return () => setMount(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	let totalComments = 0

	const getNumberOfComments = (array) => {
		if (array === undefined) return
		array.map(item => {
			totalComments = totalComments + 1
			getItem(item).then(async data => {
				getNumberOfComments(data.kids)
			})
		})
		setCount(totalComments)
		return totalComments
	}

	useEffect(() => {
		if (story) {
			if (mounted) {
				getNumberOfComments(story.kids)
				setTimeout(() => {
					if (mounted) {
						setUpdate(update + 1)
					}
				}, 60000)
			}
		}
		return () => setMount(false)
	}, [story, update])



	return story ? (
		<div className='story-page'>
			<div className='story-content'>
				<div className='title'>
					<Link to='/' className='back-btn'>Back to the news</Link>
					{story.title}
					<a href={story.url} className='link'>{story.url}</a>
				</div>
				<div className='info'>
					<div className='attr'>
						<span>Author:</span> {story.by}
					</div>
					<div className='attr'>
						<span>Date:</span> {moment(new Date(story.time * 1000)).format('LL')}
					</div>
				</div>
			</div>
			<div className='comments-list'>
				<div className='comments-title'>
					<div onClick={() => { setUpdate(update + 1) }} className='refresh'><img className='icon' src="../refresh.svg" alt="refresh" /></div>
					Comments
					<div className='comments-number'>{count}</div>
				</div>
				{story.kids ? story.kids.map((item) => {
					return <Comment update={update} key={item} item={item} />
				}) : (<div className='empty-comments'>No comments yet</div>)}
			</div>
		</div>
	) : (<Loader />)
}