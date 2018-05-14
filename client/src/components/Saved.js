import React, { Component } from "react";
import axios from "axios";
import { Collapse, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, } from "reactstrap";

class Saved extends Component {

	constructor(props) {
		super(props);
    this.state = { 
      collapse: false 
    };
    this.toggle = this.toggle.bind(this);
	}

	toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

	render() {

		const savedArticles = () => {
			axios
				.get("/api")
				.then(response => {
					response.data.map(article => {
						return (
							null
						);
					});
				});
		}

		return (
			<div>
				<Button color="secondary" block onClick={this.toggle} style={{ marginBottom: '1rem' }}>Saved Articles</Button>
	      <Collapse isOpen={this.state.collapse}>
	      	<ListGroup hover>
	      		{savedArticles}
	      	</ListGroup>
	      </Collapse>
	    </div>
		)
	}
}

export default Saved;