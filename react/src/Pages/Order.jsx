
import "./order.css"

import { useLocation } from "react-router-dom"
import { useState } from "react"

import OrderHeader from "../OrderHeader"
import { Helmet } from "react-helmet"

export default function Order(){
	const location = useLocation()
	const initBasket = location.state
	const [basket, setBasket] = useState([...initBasket])

	console.log(basket)

	return(<>
		<OrderHeader />
		<div className="order-cart">
			
			<div className="cart-items">
				{basket.map(b => {
					
					return(<div className="cart-item">
						 
						<p>{b.FoodName}</p>
						<p>${b.FoodPrice} {b.TimeTakes}Min</p>
					</div>)
				})}
			</div>

			<div>
				three four
			</div>
		</div>

		<Helmet>
			<title>Order Page - Cart</title>
			<meta name="description" content="Order Page - Cart" />
			<meta name="keywords" content={ basket.map(b => b.FoodName) } />
		</Helmet>	
	</>)
}