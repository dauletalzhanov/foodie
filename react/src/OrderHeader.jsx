import { useEffect } from "react"

export default function OrderHeader({ id }){
	useEffect(()=>{
		id >= 0 ? purple(id) : beige()

		function purple(id){
			const node = document.querySelector(".order-header")
			const noddette = node.children
			
			noddette[id].style.backgroundColor = "darkslateblue"
			noddette[id].style.color = "white"
		}

		function beige( id=-1 ){
			const node = document.querySelector(".order-header")
			const noddette = node.children

			for(let i=0; i<noddette.length; i++)
				noddette[i].style.backgroundColor = "beige"
		}
	}, [])

	return(<>
		<div className="order-header">
			<div>Cart Details</div>
			<div>Delivery Details</div>
			<div>Payment Details</div>
		</div>
	</>)
}