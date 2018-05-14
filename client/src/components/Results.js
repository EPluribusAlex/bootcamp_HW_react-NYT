import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from 'reactstrap';

class Results extends Component {

	constructor (props) {
    super(props);
    this.saveArticle = this.saveArticle.bind(this);
    this.state = {link: ""};
  }

	saveArticle = (e) => {
		console.log(e.target.getAttribute("data-link"), "data-link");
		axios
			.post("/api/scrape/article", {
				link: e.target.getAttribute("data-link")
			})
			.then(response => console.log(response, "response"))
			.catch(err => console.log(err));
	}

	render() {

		const resultRows = this.props.articles
			.slice(0, 5)
			.map(article => {
				return (
	        <tr key={this.props.articles.indexOf(article)}>
	          <th onClick={this.saveArticle} data-link={article.link}>{article.title}</th>
	        </tr>
				);
			});

		console.log(this.props.articles, "All articles scraped");

		return (
			<Table hover>
        <thead>
          <tr>
          	<th className="text-muted">Results</th>
          </tr>
        </thead>
        <tbody>
          {resultRows}
        </tbody>
      </Table>
		);

	}

}

export default Results;