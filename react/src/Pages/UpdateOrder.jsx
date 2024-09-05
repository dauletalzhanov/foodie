import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function UpdateOrder(){
	const [order, setOrder] = useState({})
	const navigate = useNavigate()
	const { id } = useParams()


	useEffect(()=>{
		async function init(){
			const res = await fetch(`http://localhost:3000/order/update/`, {
				method: "POST",
				body: JSON.stringify({ 
					title: "update order",
					id
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

			setOrder(o => ({ ...o, ...res }))
			setOrder(o => ({
				...o, 
				OrderDatetime: o["OrderDatetime"].toString().split("T")[0]
			}))
			console.log(order)
		}

		init()

	}, [])

	function handleChange(event){
		const target = event.target
		const { name, value } = event.target

		setOrder(o => ({
			...o,
			[name] : value
		}))

	}

	async function formPass(event){
		event.preventDefault()
		const formData = new FormData( event.target )

		console.log(order)

		const data = {}

		const res = await fetch(`http://localhost:3000/order/update/`, {
			method: "PUT",
			body: JSON.stringify({ 
				title: "update order",
				order
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

		navigate(-1)

	}

	return(<>
		<h1>Update Order</h1>
		<form method="post" onSubmit={formPass}>
			<div>
				<label htmlFor="OrderDatetime">Order Datetime</label>
				<input type="date" name="OrderDatetime" id="OrderDatetime" value={order["OrderDatetime"]} onChange={handleChange} />
			</div>
			
			<div>
				<label htmlFor="TotalTime" >Total Time</label>
				<input type="number" name="TotalTime" id="TotalTime" value={order["TotalTime"]} onChange={handleChange} />
			</div>

			<div>
				<label htmlFor="Billing" >Billing</label>
				<input type="number" name="Billing" id="Billing" value={order["Billing"]} onChange={handleChange} />
			</div>

			<button type="submit" >Update Order!</button>
		</form>

		<Helmet>
			<title>Update Order</title>
			<meta name="description" content="" />
			<meta name="keywords" content="" />
		</Helmet>	
	</>)
}