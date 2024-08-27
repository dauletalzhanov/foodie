import { Helmet } from "react-helmet"

// footer
import Apple 			from "../../public/app-store.svg"
import PlayStore 	from "../../public/play-store.svg"

// shops
import yellow from 	"../../public/cafe_uno.svg"
import green 	from  "../../public/cafe_dos.svg"
import blue 	from  "../../public/cafe_tres.svg"
import red 		from  "../../public/cafe_quatro.svg"

// powered by
import mongo 		from 		"../../public/mongo.svg"
import react 		from  	"../../public/react.svg"
import express 	from  	"../../public/express.svg"

// services
import menu 				from "../../public/menu.svg"
import orders 			from "../../public/calculator.svg"
import transactions from "../../public/shipping.svg"
import services 		from "../../public/cashier.svg"


export default function Landing(){
	
	return(<>
		<div>
			<div className="services">
				<div>
					<div className="square" >
						<img src={menu} alt="menu" />

					</div>
					<h3>1. Browse Menu</h3>
					<div className="descrip">
						<p>Browse menu from curated list of selections</p>
					</div>
				</div>

				<div>
					<div className="square" >
						<img src={orders} alt="orders" />
					</div>
					<h3>2. Manage Orders</h3>
					<div className="descrip">
						<p>Browse menu from curated list of selections</p>
					</div>
				</div>

				<div>
					<div className="square" >
						<img src={transactions} alt="transactions" />
					</div>
					<h3>3. Transactions</h3>
					<div className="descrip">
						<p>Browse menu from curated list of selections</p>
					</div>
				</div>

				<div>
					<div className="square" >
						<img src={services} alt="services" />
					</div>
					<h3>4. Provide Services</h3>
					<div className="descrip">
						<p>Browse menu from curated list of selections</p>
					</div>
				</div>
			</div>

			<div className="powered">

				<h2>Powered By</h2>

				<div>
					<div>
						<img src={ mongo } alt="mongo-db-logo" />
						<p>MongoDB</p>
					</div>

					<div>
						<img src={ react } alt="react-logo" />
						<p>React</p>
					</div>

					<div>
						<img src={ express } alt="express-logo" />
						<p>Express</p>
					</div>
				</div>
			</div>

			<div className="testimonials">
				<div className="testimonial">
					<div className="toppie">
						<div className="profile-picture" >
							
						</div>
						<h4>Alex Morgan</h4>						
					</div>

					<div className="bottom"> 
						<p>
							Lorem Ipsumles simplemente el texto de relleno de las imprentas y archivos de texto. 
							Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, 
							cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una 
							galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
						</p>
					</div>
				</div>

				<div className="testimonial">
					<div className="toppie">
						<div className="profile-picture" >
						</div>
						<h4>Jorgan Schelanski</h4>						
					</div>

					<div className="bottom"> 
						<p>
							Lorem Ipsumles simplemente el texto de relleno de las imprentas y archivos de texto. 
							Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, 
							cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una 
							galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
						</p>
					</div>
				</div>

				<div className="testimonial">
					<div className="toppie">
						<div className="profile-picture" >
							
						</div>
						<h4>Schnell Morgan</h4>						
					</div>

					<div className="bottom"> 
						<p>
							Lorem Ipsumles simplemente el texto de relleno de las imprentas y archivos de texto. 
							Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, 
							cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una 
							galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
						</p>
					</div>
				</div>

				<div className="testimonial">
					<div className="toppie">
						<div className="profile-picture" >
						</div>
						<h4>Sayed Malik</h4>						
					</div>

					<div className="bottom"> 
						<p>
							Lorem Ipsumles simplemente el texto de relleno de las imprentas y archivos de texto. 
							Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, 
							cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una 
							galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
						</p>
					</div>
				</div>

				<div className="testimonial">
					<div className="toppie">
						<div className="profile-picture" >
							
						</div>
						<h4>Ronald McDonald</h4>						
					</div>

					<div className="bottom"> 
						<p>
							Lorem Ipsumles simplemente el texto de relleno de las imprentas y archivos de texto. 
							Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, 
							cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una 
							galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
						</p>
					</div>
				</div>

			</div>

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