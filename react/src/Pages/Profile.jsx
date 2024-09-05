import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useParams, Link } from "react-router-dom"

export default function Profile(){
	const { id } = useParams()
	const [ orders, setOrders ] = useState([])
	const [ user, setUser ] = useState({})

	useEffect(()=>{
		async function init(){
			const result = await fetch("http://localhost:3000/customer/profile/", {
				method: "POST",
				body: JSON.stringify({ 
					title: "profile section",  
					id: id
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				}
			})
			.then(response => {
				if(!response.ok)
					throw new Error("Error")
				else
					return response.json()
			})

			//console.log(result)
			setUser(u => ( { ...u, ...result }) )
			//setUser(result)
			//console.log(user)
		}

		async function orders(){
			const result = await fetch("http://localhost:3000/order/profile/", {
				method: "POST",
				body: JSON.stringify({ 
					title: "profile section",  
					id: id
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				}
			})
			.then(response => {
				if(!response.ok)
					throw new Error("Error")
				else
					return response.json()
			})

			//console.log(result)
			setOrders([ ...result ])
		}

		init()
		orders()

	})

	function showFood(event){
		const torso = event.target.parentNode.parentNode.lastChild
		const button = event.target

		if(torso.style.display == "flex"){
			torso.style.display = "none"
			button.style.backgroundColor = "#a1a1a1"
		}
		else {
			torso.style.display = "flex"
			button.style.backgroundColor = "pink"
		}
	}
	
	return(<>	
		<div className="profile_section" >
			<div className="leftie" >
				<div className="box"></div>
				<div>
					<p className="username" > { user["username"] } </p>
					<p className="email" > { user["email"] } </p>
					<p className="names" > { user["name"] } </p>
				</div>

			</div>


			<div className="rightie">
				<p> <Link to="/settings/"> Setting </Link> </p>
				<p> <Link to="/delete/profile"> Delete </Link> </p>
				<p> <Link to="/signout"> Log Out </Link> </p>
			</div>
		</div>

		

		<div className="orders" >
			{orders.map((order, index) => {
				const [ day, time2 ]  = order.OrderDatetime.toString().split("T")
				const time = time2.split(".")[0]
				
				const hours = Math.floor(order.TotalTime/60)
				const orderTime = `${hours>=10?"":"0"}${hours}:${order.TotalTime - hours*60}`

				return(<div key={ index } className="single-order" >

					<div className="face">
						<div className="triangle" onClick={ showFood } >
						</div>

						<div>
							<p> ${ order.Billing } </p>
							<p> { orderTime } </p>
							<p> { day } </p>
							<p> { time } </p>
							<p> <Link to={ "/delete/order/" + order._id } > Delete </Link> </p>
							<p> <Link to={ "/update/order/" + order._id } > Update </Link> </p>
						</div>
					</div>
					
					<div className="torso" >
						{ order.FoodList.map(food => {
							
							return(
								<div className="food" >
									<p> { food.FoodName } </p>
									<p> { food.FoodPrice }</p>
								</div>
						)})}
					</div>

				</div>)
			})}

		</div>

		<Helmet>
			<title> Profile: {id} </title>
			<meta name="description" content="" />
			<meta name="keywords" content="" />
			<link rel="stylesheet" href="/../public/profile.css" />
		</Helmet>
	</>)
}