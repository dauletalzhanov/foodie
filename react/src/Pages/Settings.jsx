import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"


export default function Settings(){
	const [errors, setErrors] = useState({})
	const [cookies, setCookie] = useCookies(['identifier']);
	const [userData, setUser] = useState({ id: cookies["identifier"] })
	const navigate = useNavigate()
	
	useEffect(()=>{
		async function init(){
			const user = cookies["identifier"]

			if( !user )
				return navigate("/signin/")

			//console.log(user)

			let res = await fetch(`http://localhost:3000/customer/profile/id/`, {
				method: "POST",
				body: JSON.stringify({
					title: "settings",
					id: user
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

			setUser( u => ({...u, ...res}) )
		}

		init()

	}, [])

	async function formSub(event){
		event.preventDefault()
		const formData = new FormData( event.target )

		const data = {
			name: formData.get("name"),
			email: formData.get("email"),
			username: formData.get("username"),
			id:	userData["id"]
		}

		let res = await fetch(`http://localhost:3000/customer/update/profile/`, {
			method: "PUT",
			body: JSON.stringify({
				title: "updating personal data",
				...data
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

		navigate(`/profile/${userData["username"]}`)

	}

	function handleChange(event){
		const { name, value } = event.target
		setUser(prevData => ({
				...prevData,
				[name]: value
		}))
	}


	return(<>
		<h1>Settings</h1>

		<form method="post" onSubmit={ formSub }>

			<div>
				<label htmlFor="name">Name</label>
				<input type="text" name="name" id="name" placeholder="name in here" value={ userData["name"] } onChange={handleChange}  />
			</div>

			<div>
				<label htmlFor="email">Email</label>
				<input type="text" name="email" id="email" placeholder="email in here" value={ userData["email"] } onChange={handleChange}  />
			</div>

			<div>
				<label htmlFor="username">Username</label>
				<input type="text" name="username" id="username" value={ userData["username"] } onChange={handleChange} />
			</div>

			<button type="submit"> Update! </button>
		</form>


		<Helmet>
			<title>Settings</title>
			<meta name="description" content="" />
			<meta name="keywords" content="" />
		</Helmet>
	</>)
}