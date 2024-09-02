import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { Helmet } from "react-helmet"
import { useLocation, useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"
const navigate = useNavigate()

export default function Settings(){
	const [errors, setErrors] = useState({})
	const [cookies, setCookie] = useCookies(['identifier']);
	const navigate = useNavigate()
	
	useEffect(()=>{
		async function init(){
			console.log("fetch profile details from here")
		}
	}, [])
	return(<>
		<h1>Settings</h1>


		<Helmet>
			<title>Settngs</title>
		</Helmet>
	</>)
}