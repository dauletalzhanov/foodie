import { useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"

export default function Signup(){
	const [errors, setErrors] = useState([])

	const navigate = useNavigate()

	async function register(title, data){
		const URL = `http://localhost:3000/customer/register/`
		
		const result = await fetch(URL, {
			method: "POST",
			body: JSON.stringify({
				title: title,
				body: data
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

		//console.log(result)
		return result
	}

	async function submit(event){
		event.preventDefault()

		const formData = new FormData(event.target)
		const data = {
			"name":  formData.get("name"),
			"email": formData.get("email")
		}

		const result = await register("New User", data)

		console.log(result)

		if(result["error"]){
			console.log("error")
		} else {
			const id = result["id"]
			navigate(`/profile/${id}`)
		}
			
	}

	return(<>
		<h1>Sign Up</h1>

		<form method="POST" onSubmit={submit}>
			<div>
				<label htmlFor="name">Name</label>
				<input type="text" name="name" id="name" />
			</div>

			<div>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" />
			</div>

			<button type="submit">Register</button>
		</form>

		{errors.map(err => {
			return(<>
				<p>{err}</p>
			</>)
		})}
		
		<Helmet>
			<title>Sign Up - Foodie</title>
		</Helmet>
	</>)
}