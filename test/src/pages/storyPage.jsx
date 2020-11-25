import React from 'react'
import { useParams } from 'react-router-dom';

export const StoryPage = () => {
	const id = useParams().id
	return (
		<div>News with id:{id}</div>
	)
}