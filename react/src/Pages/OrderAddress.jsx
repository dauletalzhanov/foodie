import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

import OrderHeader from "../OrderHeader"

export default function OrderAddress(){
	const navigate = useNavigate()
	const location = useLocation()
	//const { initBasket } = location.state
	
	const [ basket, setBasket ] = useState([...location.state["basket"]])
	const [ total, setTotal ] = useState( location.state["total"] )

	const [ addressData, setAddress] = useState({})

	console.log(basket)

	function formPass(event){

		event.preventDefault()

		const formData = new FormData(event.target)

		const data = {
			"name": formData.get("name"),
			"address": formData.get("address"),
			"address2": formData.get("address2"),
			"telephone": formData.get("telephone"),
			"email": formData.get("email"),
			"cash/card" : formData.get("order-payment-type"),
			"now/later" : formData.get("order-time"),
			"delivery type" : formData.get("order-type"),
		}

		console.log(data)

		setAddress(data)

		navigate("/order/payment", { state: { basket, addressData  } })
	}

	return(<>		
		<OrderHeader id="1" />
		
		<form onSubmit={formPass} >
			<div className="orAdd">
				<div className="orAdd-leftie">
					<fieldset>
						<legend>Choose Delivery Type</legend>
				
						<div>
							<input type="radio" name="order-type" id="order-delivery" value="delivery" checked/>
							<label htmlFor="order-delivery">Delivery</label>
						</div>
						
						<div>
							<input type="radio" name="order-type" id="order-pickup" value="pickup" />
							<label htmlFor="order-pickup">Pickup</label>
						</div>

					</fieldset>

					<fieldset>
						<legend>Time of Delivery</legend>

						<div>
							<input type="radio" name="order-time" id="order-time-now" value="now"  checked/>
							<label htmlFor="order-time-now">Now</label>					
						</div>

						<div>
							<input type="radio" name="order-time" id="order-time-specific" value="later" />
							<label htmlFor="order-time-specific">Specific Time</label>
						</div>

					</fieldset>

					<fieldset>
						<legend>Choose Payment</legend>

						<div>
							<input type="radio" name="order-payment-type" id="order-payment-card" value="card" checked/>
							<label htmlFor="order-payment-card">Card</label>
						</div>

						<div>	
							<input type="radio" name="order-payment-type" id="order-payment-cash" value="cash" />
							<label htmlFor="order-payment-cash">Cash</label>
						</div>

					</fieldset>

				</div>

				<hr />

				<div className="orAdd-rightie">
					<fieldset className="orAdd-address">
						<legend>Address Details</legend>
						<input type="text" placeholder="Name" name="name" required />
						<input type="text" placeholder="Address" name="address" required />
						<input type="text" placeholder="Address 2" name="address2" required />
						<input type="text" placeholder="Telephone" name="telephone" required />
						<input type="text" placeholder="Email" name="email" required />
						
					</fieldset>
				</div>
			</div>

			<button type="submit">Proceed</button>
		</form>

		
		
		<Helmet>
			<meta name="description" content="Address Page for the Order" />
			<meta name="keywords" content="Home, Foodie" />
			<title>Order - Address</title>

			<link rel="stylesheet" href="../public/OrderAddress.css" />
		</Helmet>
	</>)
}