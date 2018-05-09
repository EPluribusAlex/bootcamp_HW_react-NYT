import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "../App.css";
import Search from "./Search";
import Results from "./Results";
import Saved from "./Saved";
import Jumbo from "./Jumbo";

class Home extends Component {

	render() {
		return (
			<div className="wrapper">
				<Jumbo />
				<Container>
					<Row>
						<Saved />
					</Row>
					<Row>
						<Search />
					</Row>
					<Row>
						<Results />
					</Row>
				</Container>	
			</div>
		)
	}

}

export default Home;