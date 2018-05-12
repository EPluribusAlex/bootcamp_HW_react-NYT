import React, { Component } from "react";
import { Table, Button } from 'reactstrap';

class Results extends Component {

	render() {
		console.log(this.props, "props");
		const tableRows = this.props.articles.forEach(article => {
			console.log(article, "article");
			return (
        <tr>
          <th>{article.title}</th>
          <th>
          	<Button>Link</Button>
          	<Button>Save</Button>
          </th>
        </tr>
			);
		});

		return (
			<Table hover>
        <thead>
          <tr><th>Results</th></tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
		)
	}
}

export default Results;