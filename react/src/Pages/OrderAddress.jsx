
//import "./orderAddress.css"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

import OrderHeader from "../OrderHeader"

export default function OrderAddress(){

	return(<>		
		<OrderHeader id="1" />

		<div className="orAdd">
			<div className="orAdd-leftie">
				<fieldset>
					<legend>Choose Delivery Type</legend>
			
					<div>
						<input type="radio" name="order-type" id="order-delivery" checked/>
						<label htmlFor="order-delivery">Delivery</label>
					</div>
					
					<div>
						<input type="radio" name="order-type" id="order-pickup" />
						<label htmlFor="order-pickup">Pickup</label>
					</div>

				</fieldset>

				<fieldset>
					<legend>Time of Delivery</legend>

					<div>
						<input type="radio" name="order-time" id="order-delivery" checked/>
						<label htmlFor="order-time-now">Now</label>					
					</div>

					<div>
						<input type="radio" name="order-time" id="order-time-specific" />
						<label htmlFor="order-time-specific">Specific Time</label>
					</div>

				</fieldset>

				<fieldset>
					<legend>Choose Payment</legend>

					<div>
						<input type="radio" name="order-payment-type" id="order-payment-card" checked/>
						<label htmlFor="order-payment-card">Card</label>
					</div>

					<div>	
						<input type="radio" name="order-payment-type" id="order-payment-cash" />
						<label htmlFor="order-payment-cash">Cash</label>
					</div>

				</fieldset>

			</div>

			<hr />

			<div className="orAdd-rightie">
				<fieldset className="orAdd-address">
					<legend>Address Details</legend>
					<input type="text" placeholder="Name" />
					<input type="text" placeholder="Address" />
					<input type="text" placeholder="Address 2" />
					<input type="text" placeholder="Telephone" />
					<input type="text" placeholder="Email" />
					
					<div></div>
				</fieldset>
			</div>
		</div>
		
		<Helmet>
			<meta name="description" content="Address Page for the Order" />
			<meta name="keywords" content="Home, Foodie" />
			<title>Order - Address</title>

			<link rel="stylesheet" href="../public/OrderAddress.css" />
		</Helmet>
	</>)
}