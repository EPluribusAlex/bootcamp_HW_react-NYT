import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Results from "./Results";

class Search extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	search: "",
    	startDate: "",
    	endDate: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

	render() {

		const articles = [];

		const submitSearch = (event) => {
	  	event.preventDefault();
	    const data = {
	    	search: this.state.search,
	    	startDate: this.state.startDate.split("-").join(""),
	    	endDate: this.state.endDate.split("-").join("")
	    };
	    
	    axios
	    	.post("/api/scrape/search", {data})
	    	.then(response => {
	    		response.data.forEach(item => {
	    			articles.push(item);
	    		});
	    	})
	    	.catch(err => console.log(err));
	  }

		return (
			<Row>
				<Col lg="3">
					<Form onSubmit={submitSearch}>
						<FormGroup>
		          <Label for="searchTerms">Keyword</Label>
		          <Input type="search" name="search" id="searchTerms" placeholder="Enter a search term" value={this.state.search} onChange={this.handleInputChange} />
		        </FormGroup>
						<FormGroup>
			        <Label for="startDate">Start Date</Label>
			        <Input type="date" name="startDate" id="startDate" placeholder="Enter the earliest date from which you wish articles to appear" value={this.state.startDate} onChange={this.handleInputChange} />
			      </FormGroup>
			      <FormGroup>
			        <Label for="endDate">End Date</Label>
			        <Input type="date" name="endDate" id="endDate" placeholder="Enter the latest date from which you wish articles to appear" value={this.state.endDate} onChange={this.handleInputChange} />
			      </FormGroup>
			      <Button>Search</Button>
		      </Form>
		    </Col>
		    <Col lg="9">
		     	<Results articles={articles} />
		    </Col>
		  </Row>
		)
	}
}

export default Search;
