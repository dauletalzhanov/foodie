import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"

export default function Signout(){
	const [cookies, setCookie] = useCookies(['identifier']);
	const navigate = useNavigate()

	function logout(){
		setCookie("identifier", "")
		navigate("/")
	}

	function leave(){
		navigate("/shop/")
	}

	return(<>
		<div className="logout" >
			<h1> Are you sure you want to log out? </h1>

			<div className="buttons" >
				<button onClick={logout}> Yes </button>
				<button onClick={leave} >  No </button>
			</div>
			
		</div>

		<Helmet>
			<title> Log Out </title>
			<meta name="description" content="" />
			<meta name="keywords" content="" />
			<link rel="stylesheet" href="../public/signout.css" />
		</Helmet>
	</>)
}