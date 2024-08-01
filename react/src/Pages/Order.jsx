
import "./order.css"

import React from "react"
import { useLocation } from "react-router-dom"
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

	//console.log(basket)
	console.log(quantities)

	console.log(basket)

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
		

	}, [quantities])

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
							<button onClick={decQuantity}>{"-"}</button>

							<p>{ b.quantity }</p>
							<input type="number" onChange={quantChange} value={quantities[b.FoodName]} />

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

		<Helmet>
			<title>Foodie - Order Page - Cart</title>
			<meta name="description" content="Order Page - Cart" />
			<meta name="keywords" content={ basket.map(b => b.FoodName) } />
		</Helmet>	
	</>)
}