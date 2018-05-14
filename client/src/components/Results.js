import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from "reactstrap";

class Results extends Component {

	constructor (props) {
    super(props);
    this.saveArticle = this.saveArticle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.openModal = this.openModal.bind(this);
    this.state = {
    	link: "",
    	modal: false,
    	info: {},
    	comment: "",
    	articles: this.props.articles
    };
  }

  onDBChange = (v) => {
		this.props.onDBChange("dbArticles", v);
  }

  toggleModal() {
  	this.setState({
      modal: !this.state.modal
    });
  }

  openModal(e) {
  	this.toggleModal();
    this.setState({
      info: {
      	title: e.target.firstChild.nodeValue,
				link: e.target.getAttribute("data-link")
      }
    });
  }

	saveArticle = (e) => {
		console.log(this.state.info);
		axios
			.post("/api/save", {
				title: this.state.info.title,
				link: this.state.info.link,
				comment: this.state.comment
			})
			.then(response => console.log("saved"))
			.catch(err => console.log(err));
		this.state.articles.forEach(article => {
			if(article.title === this.state.info.title) {
				this.state.articles.splice(this.state.articles.indexOf(article), 1);
			}
		});
		this.toggleModal();
		axios
			.get("/api")
			.then(response => {
				console.log(response.data);
				this.setState({ dbArticles: response.data });
				this.onDBChange(response.data);
			});
	}

	updateInputValue(evt) {
    this.setState({
      comment: evt.target.value
    });
  }

	render() {

		const resultRows = this.props.articles
			.slice(0, 5)
			.map(article => {
				return (
	        <tr key={this.props.articles.indexOf(article)}>
	          <th onClick={this.openModal} data-link={article.link} data-summary={article.summary} >{article.title}</th>
	        </tr>
				);
			});

		console.log(this.props.articles, "All articles scraped");

		return (
			<div>	

				<Table hover>
	        <thead>
	          <tr>
	          	<th className="text-muted">Results<p className="font-italic float-right hover_txt">click to save!</p></th>
	          </tr>
	        </thead>
	        <tbody>
	          {resultRows}
	        </tbody>
	      </Table>

	      <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
		      <ModalHeader toggle={this.toggleModal}>Add Comment</ModalHeader>
		      <ModalBody>
		        <Label for="comment_txt">Comment</Label>
	          <Input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} type="textarea" name="text" id="comment_txt" />
		      </ModalBody>
		      <ModalFooter>
	          <Button color="secondary" onClick={this.saveArticle}>Submit</Button>{' '}
	          <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
	        </ModalFooter>
		    </Modal>

	    </div>
		);

	}

}

export default Results;