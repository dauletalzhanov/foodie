
import "./order.css"

import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import OrderHeader from "../OrderHeader"
import { Helmet } from "react-helmet"

export default function Order(){
	const location = useLocation()
	// object destructuring does not work
	const { initBasket, initQuantity } = location.state
	
	const [ basket, setBasket ] = useState([...location.state["basket"]])
	const [ quantities, setQuantities ] = useState({...location.state["quantities"]})
	const [ total, setTotal ] = useState(0)

	const navigate = useNavigate()

	//console.log(basket)
	//console.log(quantities)

	useEffect(()=>{
		let tempTotal = 0
		for(let i=0; i<basket.length; i++){
			tempTotal += basket[i].FoodPrice * quantities[basket[i].FoodName]

			console.log(tempTotal)
		}

		setTotal(tempTotal)

		
		for(let i=0; i<basket.length; i++){
			basket[i] = {
				...basket[i],
				quantity : quantities[basket[i].FoodName]
			}
		}

		console.log(basket)
		

	}, [quantities])

	function incQuantity(event){
		console.log(event.target.parentNode.id)
		const idName = event.target.parentNode.id
		
		basket[idName].quantity++
		
		console.log(basket[idName])
	}

	function decQuantity(event){
		console.log(event.target.parentNode.id)

		const idName = event.target.parentNode.id
		//quantities[idName] > 1 ? quantities[idName]-- : quantities[idName] = 0
		basket[idName].quantity--
		console.log(basket[idName])

		//console.log(quantities)
	}

	function quantChange(event){
		console.log(event.target.parentNode.id)
		const idName = event.target.parentNode.id
		const changeValue = event.target.value

		/*
			let newQuant = {
			...quantities,
			quantities[idName]: changeValue
		}
		*/

		let newQuant = quantities
		newQuant[idName] = changeValue
		
		setQuantities(newQuant)

		console.log(quantities)
	}

	function proceedButton(event){
		navigate("/order/address", { state: { key: "value" } })
	}

	return(<>
		<OrderHeader />
		<div className="order-cart">
			
			<div className="cart-items">
				{basket.map((b, index) => {
					
					return(<div className="cart-item">
						 <div>
							<p>{b.FoodName}</p>
							<p>${b.FoodPrice} {b.TimeTakes}Min</p>
						 </div>
						
						<div id={index} className="rightie-cart-item">
							<button onClick={decQuantity}>{"-"}</button>

							<input type="number" onChange={quantChange} value={b.quantity} />

							<button onClick={incQuantity}>{"+"}</button>
						</div>
					</div>)
				})}
			</div>

			<div>
				<div className="cart-sidebar">
					<div>
						<h2>Total</h2>
						<p>Food: { total } USD</p>
						<p>Delivery: 5 USD</p>
					</div>

					<div>
						<p className="total-price" > 
							Total: { total + 5 } USD
						</p>
					</div>
				</div>
			</div>
		</div>

		<button className="proceed-button" onClick={proceedButton}>Proceed</button>

		<Helmet>
			<title>Foodie - Order Page - Cart</title>
			<meta name="description" content="Order Page - Cart" />
			<meta name="keywords" content={ basket.map(b => b.FoodName) } />
		</Helmet>	
	</>)
}