import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Link, useNavigate } from "react-router-dom"

import "./shop.css"

export default function Shop(){
	const [menu, setMenu] = useState([])
	const [balance, setBalance] = useState(0)

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
		console.log(menu[food])

		setBalance(i => i + menu[food]["FoodPrice"])
	}

	function orderItems(){
		navigate("/items")
	}

	return(<>
		<h1>Shop</h1>

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

				<Link to="/items">List of Items</Link>
			</div>

			<button onClick={orderItems}>Proceed to Order</button>

		</div>


		<Helmet>
			<title>Foodie - Shopping</title>
			<meta name="description" content="Food Catalogue" />
			<meta name="keywords" content={menu.map((food)=> food["FoodName"])} />
		</Helmet>
	</>)
}