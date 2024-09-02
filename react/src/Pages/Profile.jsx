import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"

export default function Profile(){
	const { id } = useParams()

	useEffect(()=>{
		async function init(){
			const result = await fetch("http://localhost:3000/customer/profile/", {
				method: "POST",
				body: JSON.stringify({ 
					title: "profile section",  
					id: id
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				 }
			})
			.then(response => {
				if(!response.ok)
					throw new Error("Error")
				else
					return response.json()
			})

			console.log(result)
		}

		init()

	}, [])
	
	return(<>	
		<h1> { id } </h1>
		<div>
			<Link to="/settings/">Settings</Link>
		</div>

		<Helmet>
			<title> Profile: {id} </title>
		</Helmet>
	
	</>)
}