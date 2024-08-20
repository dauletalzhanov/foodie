import { useEffect } from "react"

import OrderHeader from "../OrderHeader"
import { Helmet } from "react-helmet"
import { useLocation, useNavigate } from "react-router-dom"

//import "./orderPayment.css"

export default function OrderAddress(){
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(()=>{
		
	}, [])


	function onSameDelivery(event){
		console.log("same delivery")

		const addresses = document.querySelectorAll("#addresses > div > input")
		for(let i=0; i<addresses.length; i++){
			console.log(addresses)
			addresses[i].removeAttribute("disabled");
		}
	}

	function onDiffDelivery(event){
		console.log("different delivery")

		const addresses = document.querySelectorAll("#addresses > div > input")
		for(let i=0; i<addresses.length; i++){
			console.log(addresses)
			addresses[i].setAttribute("disabled", "");
		}

	}

	function submitting(event){

		event.preventDefault()

		const formData = new FormData(event.target)

		const data = {

		}

	}


	return(<>
		<OrderHeader id={"2"}/> 

		<form method="POST" className="payment-form" onSubmit={ submitting } >
			<div>

			
			<div className="order-method">
				<h3>Payment Method</h3>
				
				<div className="order-payment-method">
					<div>
						<input type="radio" name="payment_type" value="visa" id="visa_card" />
						<label htmlFor="visa_card">Visa</label>
					</div>


					<div>
						<input type="radio" name="payment_type" value="mastercard" id="master_card" />
						<label htmlFor="master_card">MasterCard</label>
					</div>
				
					<div>
						<input type="radio" name="payment_type" value="paypal" id="paypal" />
						<label htmlFor="paypal">PayPal</label>
					</div>
				</div>

				<div className="card-details">
					<div>
						<label htmlFor="order-name-on-card">Name on Card</label>
						<input type="text" name="name_on_card" id="order-name-on-card" placeholder="Name" />
					</div>

					<div>
						<label htmlFor="order-card_number-on-card">Card Number</label>
						<input 
							type="tel" 
							name="card_number" 
							id="order-card_number-on-card" 
							maxLength="16" 
							placeholder="XXXX XXXX XXXX XXXX"
						/>
					</div>

					<div>
						<label htmlFor="start_date">Start Date</label>
						<input type="date" name="start_date" id="start_date" required />
					</div>
					
					<div>
						<label htmlFor="end_date">Expiry Date</label>
						<input type="date" name="end_date" id="end_date" required />
					</div>

					<div>
						<label htmlFor="cvc_number">CVC</label>
						<input type="tel" name="cvc_number" id="cvc_number" maxLength={3} minLength={3} />
					</div>
				</div>

				

			</div>

			<hr />

			<div className="rightie" >
				<div className="delivery_address_type">
					<h3>Card Address</h3>

					<div >
						<label htmlFor="delivery_same">Same as the Delivery Address</label>
						<input 
							type="radio" 
							name="delivery_address" 
							id="delivery_same" 
							onChange={ onSameDelivery } 
						/>
					</div>

					<div >
						<label htmlFor="delivery_different">My Card Address is Different</label>
						<input 
							type="radio" 
							name="delivery_address" 
							id="delivery_different" 
							onChange={ onDiffDelivery } 
						/>
					</div>
				</div>

				<div id="addresses" > 
					<div>
						<label htmlFor="">Address 1</label>
						<input type="text" name="" id="" />
					</div>

					<div>
						<label htmlFor="">Address 2</label>
						<input type="text" name="" id=""  />
					</div>

					<div>
						<label htmlFor="">Address 3</label>
						<input type="text" name="" id="" />
					</div>
				</div>
				

			</div>
		</div>
			
			<button type="submit" className="submit-payment" >Submit!</button>
		</form>

		<Helmet>
			<title>Order Payment</title>
			<meta name="description" content="" />
			<meta name="keywords" content="" />
			

			<link rel="stylesheet" href="../public/orderPayment.css" />
		</Helmet>
	</>)
}