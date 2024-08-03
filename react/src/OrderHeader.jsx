import { useEffect } from "react"

export default function OrderHeader({ id }){
	useEffect(()=>{
		const node = document.querySelector(".order-header")
		const noddette = node.children
		
		noddette[id].style.backgroundColor = "darkslateblue"
		noddette[id].style.color = "white"
	}, [])

	return(<>
		<div className="order-header">
			<div>Cart Details</div>
			<div>Delivery Details</div>
			<div>Payment Details</div>
		</div>
	</>)
}