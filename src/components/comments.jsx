/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from '../services/api'
import { update } from '../redux/actions'
import { Loader } from './loader'
import '../styles/storyPage.scss'

export const Comment = ({ item }) => {
	const [comment, setComment] = useState(null)
	const [showKids, setKids] = useState(false)
	const [loading, setLoading] = useState(true)
	const updateComm = useSelector(state => state.update)
	const dispatch = useDispatch()

	useEffect(() => {
		let mounted = true
		setLoading(true)
		if (item) {
			getItem(item).then(data => {
				if (mounted) {
					setComment(data)
					setLoading(false)
					setTimeout(() => {
						if (mounted) {
							dispatch(update())
						}
					}, 5000)
				}
			})
		}
		return () => mounted = false
	}, [updateComm])

	if (!item) {
		return null
	}

	return !loading ? (
		comment.text ? (
			<>
				<div className={!showKids ? 'comment-item' : 'comment-item active'}>
					<div
						onClick={() => {
							if (comment.kids) {
								setKids(!showKids)
							}
							return null
						}}
						className='main-comment'>
						<div className='comment-info'>
							<div className='comment-author'>{comment.by}</div>
						</div>
						<div className='comment-text'>
							{comment.text}
						</div>
						{comment.kids ?
							<div className='comment-replies'>
								Replies: {comment.kids.length}
								<img className={!showKids ? 'arrow' : 'arrow activeArrow'} src='../arrow.svg' alt='arrow'></img>
							</div>
							: null}
					</div>
					{showKids && comment.kids ? comment.kids.map(item => {
						return (
							<div key={item} className='subcomments'>
								<Comment key={item} item={item} />
							</div>
						)
					}) : (null)}
				</div>
			</>) : (null)
	) : (<Loader />)

}