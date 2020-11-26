/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { getItem } from '../services/api'
import '../styles/storyPage.scss'
import { Loader } from './loader'

export const Comment = ({ item, update }) => {
	const [comment, setComment] = useState(null)
	const [showKids, setKids] = useState(false)
	const [loading, setLoading] = useState(true)
	const [count, setCount] = useState(0)

	useEffect(() => {
		let mounted = true
		setLoading(true)
		if (item) {
			getItem(item).then(data => {
				if (mounted) {
					setComment(data)
					setLoading(false)
				}
			})
		}
		return () => mounted = false
	}, [update])

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