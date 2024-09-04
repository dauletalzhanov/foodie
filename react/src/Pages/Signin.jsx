import { Helmet } from "react-helmet"
import { useCookies } from 'react-cookie'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"


export default function Signin(){
	const [errors, setErrors] = useState({})
	const [cookies, setCookie] = useCookies(['identifier']);
	const navigate = useNavigate()

	async function loginForm(event){
		event.preventDefault()
		const formData = new FormData( event.target )
		//const salt = await bcrypt.genSalt(10)
		//const hash = await bcrypt.hash( formData.get("password"), salt )
		
		const data = {
			email: 		formData.get("email"),
			password: formData.get("password") //hash
		}

		const result = await fetch("http://localhost:3000/customer/login/", {
			method: "POST",
			body: JSON.stringify({ ...data }),
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

		setCookie("identifier", result["id"])
		
		setErrors({ "error": "Wrong Details" })
		
		result["status"] ? navigate(`/profile/${ result["username"] }`) : ""
		//console.log(result)
	}

	return(<>
		<form method="POST" onSubmit={ loginForm } >
			<div>
				<label htmlFor="email" > Email </label>
				<input type="email" name="email" id="email" required />
			</div>

			<div>
				<label htmlFor="password" > Password </label>
				<input type="password" name="password" id="password" required />
			</div>

			<button type="submit" > Submit! </button>
		</form>

		{Object.keys(errors).map( err => {
			return(<>
				<p> { errors[err] } </p>
			</>)
		})}
		
		<Helmet>
			<title>Log In</title>
			<link rel="stylesheet" href="../Public/signin.css" />
			<meta name="keywords" content="" />
			<meta name="description" content="" />
		</Helmet>
	</>)
}