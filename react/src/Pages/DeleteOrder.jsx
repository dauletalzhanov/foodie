import { useNavigate, useParams } from "react-router-dom"

export default function DeleteOrder(){
	const {id} = useParams()
	const navigate = useNavigate()

	async function goBack(){
		navigate(-1)
	}

	async function deleteOrder(){
		const result = await fetch("http://localhost:3000/order/delete/", {
			method: "DELETE",
			body: JSON.stringify({ 
				title: "delete order",  
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

		navigate(-1)
	}

	return(<>
		<div>
			<h1>Are you sure you want to delete this order?</h1>

			<div>
				<button onClick={goBack} > No </button>
				<button onClick={deleteOrder} > Yes </button>
			</div>
		</div>
	</>)
}