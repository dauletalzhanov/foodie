import OrderHeader from "../OrderHeader"
import { useLocation, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { Helmet } from "react-helmet"
import { useState } from "react"
import egg from "../../public/egg.svg"
import { useEffect } from "react"

export default function Faberge(){
	const navigate = useNavigate()
	const location = useLocation()
	const [ bundle,  setBundle ] = useState({ ...location.state["bundle"] })
	const [ cookies, setCookie ] = useCookies(['identifier']);
	
	useEffect(()=>{
		async function sendBundle(){
			const result = await fetch("http://localhost:3000/order/create/", {
				method: "POST",
				body: JSON.stringify({ 
					...bundle, 
					customerID: cookies['identifier'] 
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

		sendBundle()

	}, [])

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
