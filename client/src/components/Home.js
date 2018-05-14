import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import "../App.css";
import Search from "./Search";
import Saved from "./Saved";
import Jumbo from "./Jumbo";
import Results from "./Results";

class Home extends Component {

	constructor(props) {
		super(props);
		this.submitSearch = this.submitSearch.bind(this);
		this.onChildChange = this.onChildChange.bind(this);
		this.state = {
			searchTerms: "",
			startDate: "",
			endDate: "",
			articles: [],
      dbArticles: []
		};
	}

	submitSearch(event) {
		event.preventDefault();
    axios
    	.post("/api/scrape/search", {
    		query: this.state.searchTerms.split(" ").join("+"),
    		startDate: this.state.startDate.split("-").join(""),
    		endDate: this.state.endDate.split("-").join("")
    	})
    	.then(response => {
    		this.setState({
    			articles: response.data
    		});
    	})
    	.catch(err => console.log(err));
	}

	onChildChange(childName, childValue) {
		const newState = {};
    newState[childName] = childValue;
    this.setState(newState);
	}

	render() {

		const resultsTable = this.state.articles.length != 0 ? 
			(
				<Results articles={this.state.articles} onDBChange={this.onChildChange} />
			) : ( 
				null
			);

		return (
			<div className="wrapper">
				<Jumbo />
				<Container>
					<Row>
						<Col>
							<Saved dbArticles={this.state.dbArticles} onDBChange={this.onChildChange} />
						</Col>
					</Row>
					<Row>
						<Col lg="3">
							<Search submitSearch={this.submitSearch} onFormChange={this.onChildChange} />
						</Col>
						<Col lg="9">
			    		{resultsTable}
			    	</Col>
		  		</Row>
				</Container>	
			</div>
		);

	}

}

export default Home;