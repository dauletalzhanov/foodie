import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"

import "./shop.css"

export default function Shop(){
	const [menu, setMenu] = useState([])

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

		getFood("669cfe05e9ca72abe25b5c2f")
	}, [menu])

	return(<>
		<h1>Shop</h1>

		<div className="catalogue">
			{menu.map((food) => {
				return(
					<p key={food["_id"]}>{food["FoodName"]} - {food["FoodPrice"]}</p>

				)
			})}
		</div>


		<Helmet>
			<title>Foodie - Shopping</title>
			<meta name="description" content="Food Catalogue" />
		</Helmet>
	</>)
}