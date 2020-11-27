import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getItem } from '../services/api'
import { Loader } from '../components/loader'
import { Comment } from '../components/comments'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../redux/actions'
import '../styles/storyPage.scss'

export const StoryPage = () => {
	const id = useParams().id
	const [story, setStory] = useState(null)
	const [comments, setComments] = useState(null)
	// const [count, setCount] = useState(0)
	const [mounted, setMount] = useState(true)

	const updateComm = useSelector(state => state.update)

	const dispatch = useDispatch()

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

	useEffect(() => {
		if (id) {
			getItem(id).then(data => {
				if (mounted) {
					setComments(data.kids)
				}
			})
		}
		return () => setMount(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateComm])


	//===========================================================================================================================================================
	//Здесь я получаю все комментарии, учитывая ответы. Оно работает, но я не уверен что правильно все сделал и нужно ли выводить все комментарии, а не только корневые

	// let totalComments = 0

	// const getNumberOfComments = (array) => {
	// 	if (array === undefined) return
	// 	totalComments = totalComments + array.length
	// 	array.map(item => {
	// 		getItem(item).then(async data => {
	// 			getNumberOfComments(data.kids)
	// 		})
	// 	})
	// 	setCount(totalComments)
	// 	return totalComments
	// }

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
					<div onClick={() => { console.log(comments) }} className='attr'>
						<span>Date:</span> {moment(new Date(story.time * 1000)).format('LL')}
					</div>
				</div>
			</div>
			<div className='comments-list'>
				<div className='comments-title'>
					<div onClick={() => dispatch(update())} className='refresh'><img className='icon' src="../refresh.svg" alt="refresh" /></div>
					Comments
					<div className='comments-number'>{comments ? comments.length : 0}</div>
				</div>
				{comments ? comments.map((item) => {
					return <Comment key={item} item={item} />
				}) : (<div className='empty-comments'>No comments yet</div>)}
			</div>
		</div>
	) : (<Loader />)
}