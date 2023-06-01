import React, {useState, useEffect} from 'react'
import {getTodayImage} from '../api'

const Home = () => {
	const [image, setImage] = useState()

	useEffect(() => {
		getTodayImage()
			.then(response => {
				console.log(response.data);
				setImage(response.data.data)
			})
	}, [])

	return (
		<div className="container-fluid text-center">
			{ image &&
				<div className="image">
					<h2 className="title">
						{image.title}
					</h2>
					<img src={image.url} alt={image.title} /> 
					<div className="explanation">
						{image.explanation}
					</div>
				</div>
			}
		</div>
	)
}

export default Home
