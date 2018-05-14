import React, { Component } from "react";
import axios from "axios";
import { Collapse, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from "reactstrap";
import "./Home.css";

class Saved extends Component {

	constructor(props) {
		super(props);
    this.state = { 
      collapse: false, 
      modal: false,
      itemID: "",
      comment: ""
    };
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.remove = this.remove.bind(this);
    this.openModal = this.openModal.bind(this);
	}

	onDBChange = (v) => {
		this.props.onDBChange("dbArticles", v);
  }

	componentDidMount() {
  	axios
			.get("/api")
			.then(response => {
				this.onDBChange(response.data);
			});
  }

  updateInputValue(evt) {
    this.setState({
      comment: evt.target.value
    });
  }

	toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  remove(e) {
  	axios
  		.delete(`/api/article/${e.target.getAttribute("data-id")}`)
  		.then(response => console.log(response.data))
  		.catch(err => console.log(err));

  	axios
			.get("/api")
			.then(response => {
				this.onDBChange(response.data);
			});
  }

  openModal(e) {
  	this.toggleModal();
  	this.setState({ itemID: e.target.getAttribute("data-id") });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dbArticles: nextProps.dbArticles });
  }

	render() {

		const editComment = () => {
			console.log(this.state.itemID, "ID");
	  	axios
				.put(`/api/article/${this.state.itemID}`, {comment: this.state.comment})
				.then(response => console.log("saved"))
				.catch(err => console.log(err));

			axios
				.get("/api")
				.then(response => {
					this.onDBChange(response.data);
				});

			this.toggleModal();
  	}

		const savedArticles = this.props.dbArticles.map(article => {
				return (
					<div key={this.props.dbArticles.indexOf(article)}>
						<ListGroupItem>
							<ListGroupItemHeading><a href={article.link}>{article.title}</a></ListGroupItemHeading>
		          <ListGroupItemText>
		  					{article.comment}
		          </ListGroupItemText>
		          <ListGroupItemText className="font-italic">
		          	last edited {article.date}
		          </ListGroupItemText>
		        </ListGroupItem>
		        <span className="float-right">
		        	<Button className="edit_btn" onClick={this.openModal} data-id={article._id}>edit comment</Button>
		        	<Button onClick={this.remove} data-id={article._id}>remove</Button>
		        </span>
	        </div>
				);
			});

		return (
			<div>

				<Button color="secondary" block onClick={this.toggle} style={{ marginBottom: '1rem' }}>Saved Articles (click to expand)</Button>
	      <Collapse isOpen={this.state.collapse}>
	      	<ListGroup>
	      		{savedArticles}
	      	</ListGroup>
	      </Collapse>

	      <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
		      <ModalHeader toggle={this.toggleModal}>Add Comment</ModalHeader>
		      <ModalBody>
		        <Label for="comment_txt">Comment</Label>
	          <Input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} type="textarea" name="text" id="comment_txt" />
		      </ModalBody>
		      <ModalFooter>
	          <Button color="secondary" onClick={editComment}>Submit</Button>{' '}
	          <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
	        </ModalFooter>
		    </Modal>

	    </div>
		)
	}
}

export default Saved;