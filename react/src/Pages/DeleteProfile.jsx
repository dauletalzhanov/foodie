import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"

export default function DeleteProfile(){
	const navigate = useNavigate()
	const [cookies, setCookie] = useCookies(['identifier']);

	async function goBack( event ){
		navigate(`/profile/`)
	}

	async function deleteAccount( event ) {
		const res = await fetch(`http://localhost:3000/customer/delete/profile`, {
			method: "DELETE",
			body: JSON.stringify({ 
				title: "profile section",  
				id: cookies["identifier"]
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

		
		
	}

	return(<>
		<div>
			<h1>Are you sure you want to delete this account?</h1>

			<div>
				<button onClick={goBack}>Nope</button>
				<button onClick={deleteAccount} >Yup</button>
			</div>
		</div>

		<Helmet>
			<title>Delete Profile</title>
			<meta name="description" content="" />
			<meta name="keywords" content="" />
		</Helmet>
		
	</>)
}