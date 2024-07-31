
import "./order.css"

import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import OrderHeader from "../OrderHeader"
import { Helmet } from "react-helmet"

export default function Order(){
	const location = useLocation()
	// object destructuring does not work
	const { initBasket, initQuantity } = location.state
	
	const [ basket, setBasket ] = useState([...location.state["basket"]])
	const [ quantities, setQuantities] = useState({...location.state["quantities"]})

	//console.log(basket)
	//console.log(quantities)

	function incQuantity(event){
		console.log(event.target.parentNode.id)

		const idName = event.target.parentNode.id
		quantities[idName]++

		console.log(quantities)
	}

	function decQuantity(event){
		console.log(event.target.parentNode.id)

		const idName = event.target.parentNode.id
		quantities[idName] > 1 ? quantities[idName]-- : quantities[idName] = 0

		console.log(quantities)

	}

	return(<>
		<OrderHeader />
		<div className="order-cart">
			
			<div className="cart-items">
				{basket.map(b => {
					
					return(<div className="cart-item">
						 <div>
							<p>{b.FoodName}</p>
							<p>${b.FoodPrice} {b.TimeTakes}Min</p>
						 </div>
						
						<div id={b.FoodName} className="rightie-cart-item">
							<button onClick={incQuantity}>{"<"}</button>

							<p>{quantities[b.FoodName]}</p>

							<button onClick={decQuantity}>{">"}</button>
						</div>
					</div>)
				})}
			</div>

			<div>
				three four
			</div>
		</div>

		<Helmet>
			<title>Foodie - Order Page - Cart</title>
			<meta name="description" content="Order Page - Cart" />
			<meta name="keywords" content={ basket.map(b => b.FoodName) } />
		</Helmet>	
	</>)
}