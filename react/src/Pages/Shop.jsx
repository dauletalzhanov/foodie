import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Link, useNavigate } from "react-router-dom"

//import "./shop.css"

export default function Shop(){
	const [menu, setMenu] = useState([])
	const [balance, setBalance] = useState(0)
	const [basket, setBasket] = useState([])
	const [quantities, setQuantities] = useState({})

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
		let foodItem = menu[food]
		const foodName = foodItem["FoodName"]

		setBalance(i => i + menu[food]["FoodPrice"])
		
		/*
		if(basket.includes(foodItem)){
			const foodIndex = basket.indexOf(foodItem)
			foodItem["Quantity"]++
			basket[foodIndex] = foodItem
		}
		else {
			foodItem["Quantity"] = 1
			basket.unshift(foodItem)
		}
		*/
			
		
		quantities[foodName] ? quantities[foodName]++ : quantities[foodName] = 1 
		
		if(quantities[foodName] == 1)
			basket.unshift(foodItem)
		
		console.log(quantities)
		console.log(basket)
		

		let node = document.querySelector(".total-product")
		node.style.display = "flex"
	}

	function orderItems(){
		navigate("/order", { state: { basket, quantities } })
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

				<Link to="/order" state={{ basket, quantities }}>List of Items</Link>
			</div>

			<button className="order-button" onClick={orderItems}>Proceed to Order</button>

		</div>


		<Helmet>
			<title>Foodie - Shopping</title>
			<meta name="description" content="Food Catalogue" />
			<meta name="keywords" content={menu.map((food)=> food["FoodName"])} />

			<link rel="stylesheet" href="../public/shop.css" />
		</Helmet>
	</>)
}