import { useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate, Link } from "react-router-dom"
import { useCookies } from 'react-cookie'
import bcrypt from "bcryptjs"

export default function Signup(){
	const [errors, setErrors] = useState({})
	const [cookies, setCookie] = useCookies(['identifier']);

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

		return result
	}

	async function passwordHandle(formData){

		console.log(formData)

		const password = formData.get("password")
		const password2 = formData.get("password2")
		
		if( password !== password2 ){
			setErrors(e => ({
				...e, 
				"Mismatch" : "Passwords Do Not Match"
			}) )

			return "Mismatch"
		} else {
			setErrors(e => {
				const newErr = { ...e }
				delete newErr.Mismatch
				return newErr
			})
		}

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		return hash
	}

	function cookieChange(newCookie){
		setCookie("identifier", newCookie)
	}

	async function submit(event){
		event.preventDefault()

		const formData = new FormData(event.target)

		const hash = await passwordHandle(formData)
		if(hash == "Mismatch")
			return

		const data = {
			"name":  		formData.get("name"),
			"email": 		formData.get("email"),
			"username": formData.get("username"),
			"password": hash
		}

		const result = await register("New User", data)
		
		console.log(data)

		if(result["error"]){
			setErrors(e => ({
				...e, 
				"USER ERROR" : result["error"]
			}) )
		} else {
			const username = 	result["CustomerUsername"]
			const id = 				result["_id"]
			
			cookieChange(id)
			navigate( `/profile/${username}/` )
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

			<div>
				<label htmlFor="username">Username</label>
				<input type="text" name="username" id="username" pattern="^[a-zA-Z0-9]+$" />
			</div>

			<div>
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
			</div>

			<div>
				<label htmlFor="password2" >Confirm Password</label>
				<input type="password" name="password2" id="password2" />
			</div>

			<button type="submit">Register</button>
		</form>

		<p>
			Already have an account? 
			<Link to="/signin"> Log In </Link> 
		</p>
		

		{Object.keys(errors).map(err => {
			return(<>
				<p>{ errors[err] }</p>
			</>)
		})}
		
		<Helmet>
			<title>Sign Up - Foodie</title>
			<meta name="description" content="" />
			<meta name="keywords" content="" />
		</Helmet>
	</>)
}