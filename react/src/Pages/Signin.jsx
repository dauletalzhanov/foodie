import { Helmet } from "react-helmet"
import { useCookies } from 'react-cookie'
import bcrypt from "bcryptjs"

export default function Signin(){
	const [errors, setErrors] = useState({})
	const [cookies, setCookie] = useCookies(['identifier']);

	async function loginForm(event){
		event.preventDefault()
		const formData = new FormData(event.target)
	}

	return(<>
		<h1>Login</h1>

		<form action="" method="post" onSubmit={ loginForm } >
			<div>
				<label htmlFor="email"> Email </label>
				<input type="email" name="email" id="email" />
			</div>

			<div>
				<label htmlFor="password"> Password </label>
				<input type="password" name="password" id="password" />
			</div>

			<button type="submit">Submit</button>

		</form>
		
		<Helmet>
			<title>Log In</title>
		</Helmet>
	</>)
}