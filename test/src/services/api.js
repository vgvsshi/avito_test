import axios from 'axios'

const url = 'https://hacker-news.firebaseio.com/v0/'
const storiesIds = `${url}newstories.json`
const storyUrl = `${url}item/`

export const getIds = async () => {
	const result = await axios.get(storiesIds).then(({ data }) => data)
	return result
}

export const getStory = async (id) => {
	const result = await axios.get(`${storyUrl + id}.json`).then(({ data }) => data)
	return result
}