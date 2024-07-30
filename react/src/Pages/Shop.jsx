import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Link, useNavigate } from "react-router-dom"

import "./shop.css"

export default function Shop(){
	const [menu, setMenu] = useState([])
	const [balance, setBalance] = useState(0)
	const [basket, setBasket] = useState([])

	const navigate = useNavigate()

	const menu_id = `66a7c2d8945da678d761f0b8`

	useEffect(()=>{
		async function getFood(restaurant_id){
			const URL = `http://localhost:3000/restaurant/${restaurant_id}/food`
			
			let res = await fetch(URL, { mode: "cors" })
				.then(response => {
					if(!response.ok)
						throw new Error("Error")
					else
						return response.json()
				})

			setMenu(res)
			//console.log(menu)
		}

		getFood(menu_id)
	}, [menu])

	function addButton(event){
		const food = event.target.parentNode.id
		const foodItem = menu[food]
		//console.log(menu[food])

		setBalance(i => i + menu[food]["FoodPrice"])
		//setBasket(b => [ ...b, foodItem ])
		basket.unshift(foodItem)
		
		let node = document.querySelector(".total-product")
		node.style.display = "flex"
	}

	function orderItems(){
		navigate("/order")
	}

	return(<>
		<h1 className="shop-header">Food Catalog</h1>

		<div className="catalogue">
			{menu.map((food, index) => {
				return(<div className="catalogue-item" id={index} key={index}>
						<h3>{food["FoodName"]}</h3>
						<div className="pizza-red"></div>
						<p className="food-description" >
							${food["FoodPrice"]} - {food["TimeTakes"]}Mins
						</p>
						<p><strong>Ingredients: </strong>{food["IngredientsAvailable"].map((i) => i)}</p>

						<button onClick={addButton}>ADD</button>
					</div>)
			})}
		</div>

		<div className="total-product">
			<div className="leftie">
				<p>Total - ${balance}</p>

				<Link to="/order">List of Items</Link>
			</div>

			<button className="order-button" onClick={orderItems}>Proceed to Order</button>
			<Link to="/order" state={ basket }>List of Items</Link>

		</div>


		<Helmet>
			<title>Foodie - Shopping</title>
			<meta name="description" content="Food Catalogue" />
			<meta name="keywords" content={menu.map((food)=> food["FoodName"])} />
		</Helmet>
	</>)
}