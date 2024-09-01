import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

import otherStyles from "./shop.css?inline"

export default function Home(){
	return(<>
		<h1>Hello</h1>

		<div>
			<ul>
				<li><Link to="/shop">Shop</Link></li>
				<li><Link to="/landing">Landing</Link></li>
				<br />
				<li><Link to="/order/">Order</Link></li>
				<li><Link to="/order/address">Address</Link></li>
				<li><Link to="/order/payment">Payment</Link></li>
				
			</ul>
		</div>
		
		<Helmet>
			<title>HOME - FOODIE</title>
		</Helmet>
	</>)
}