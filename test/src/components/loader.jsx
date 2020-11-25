import React from 'react'
import '../styles/loader.scss'

export const Loader = () => {
	return (
		<div className='loaderWrapper'>
			<div className="loaderBlock">
				<div className="loadingSpinner" />
			</div>
		</div>
	)
}