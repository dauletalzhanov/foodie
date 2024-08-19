import OrderHeader from "../OrderHeader"

import { Helmet } from "react-helmet"

//import "./Faberge.css"

import egg from "../../public/egg.svg"

export default function Faberge(){

	function email(){
		console.log("Email Sent!")
	}

	return(<>
		<OrderHeader id="-1" />

		<div className="trophy-container">
			<img src={egg} alt="" srcset="" />
			<h2>Order Confirmed!</h2>
			
			<button className="email-button" onClick={email} >Email Confirmation?</button>
		</div>

		<Helmet>
			<title>IT'S PIZZA TIME!</title>
			<meta name="description" content="" />
			<meta name="keywords" content="" />

			<link href="../public/Faberge.css" rel="stylesheet"/>
		
		</Helmet>
	</>)
}
