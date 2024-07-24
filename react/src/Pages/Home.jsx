import { Link } from "react-router-dom"

import otherStyles from "./shop.css?inline"

export default function Home(){
	return(<>
		<h1>Hello</h1>

		<Link to="/shop">Shop</Link>
	</>)
}