import { Helmet } from "react-helmet"

// footer
import Apple from "../../public/app-store.svg"
import PlayStore from "../../public/play-store.svg"

import yellow from 	"../../public/cafe_uno.svg"
import green 	from  "../../public/cafe_dos.svg"
import blue 	from  "../../public/cafe_tres.svg"
import red 		from  "../../public/cafe_quatro.svg"

export default function Landing(){
	
	return(<>

		<div>
			<div className="mozaic" >
				<div>
					<img src={yellow} alt="" />
				</div>

				<div>
					<img src={green} alt="" />
				</div>

				<div>
					<img src={blue} alt="" />
				</div>

				<div>
					<img src={red} alt="" />
				</div>

			</div>

			<footer >
				<div className="main-footer">
					<div className="white-box"> 
						<div>
							<p> Download it on App Store </p>
							<img src={Apple} alt="apple-logo" />
						</div>

						<div>
							<p>Download it on Play Store </p>
							<img src={PlayStore} alt="play-store-logo" />
						</div>
					</div>

					<div className="just-links">
						<div className="products">
							<h3>Products</h3>
							<p>Overview</p>
							<p>Telehealth</p>
							<p>Features & Pricing</p>
							<p>Help Center</p>
						</div>

						<div className="Foodie">
							<h3>Foodie</h3>
							<p>Landing Page</p>
							<p>Log In</p>
							<p>Menu</p>
							<p>Careers</p>
						</div>

						<div className="Social Media">
							<h3>Social Media</h3>
							<p>Facebook</p>
							<p>Instagram</p>
							<p>TikTok</p>
							<p>Twitter</p>
						</div>
					</div>
				</div>

				<div>
					<h2 className="footer-footer" >
						Daulet Alzhanov ©
					</h2>
				</div>
				<hr />
				
			</footer >
		</div>

		<Helmet>
			<title>FOODIE</title>
			<meta name="description" content="" />
			<meta name="keywords" content="" />
			<meta http-equiv="X-UA-Compatible" content="ie=edge" />
			<link rel="stylesheet" href="../public/Landing.css" />
		</Helmet>	
	</>)
}