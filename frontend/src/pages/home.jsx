import React,{useState, useEffect} from 'react'

const Home = () => {
	const [imageUrl, setImageUrl] = useState("iugyiuhiuh")

	useEffect(() => {
		setImageUrl("iugyu")
	}, [])

	useEffect(() => {
		console.log(imageUrl)
	}, [imageUrl])

	return <div> Home Page! </div>
}

export default Home