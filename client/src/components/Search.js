import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Search extends Component {

  onFormChange = (e) => {
		this.props.onFormChange(e.target.name, e.target.value)
  }

	render() {
		return (		
			<Form>
				<FormGroup>
          <Label for="searchTerms">Keywords</Label>
          <Input type="search" id="searchTerms" name="searchTerms" placeholder="Enter a search term" onChange={this.onFormChange} />
        </FormGroup>
				<FormGroup>
	        <Label for="startDate">Start Date</Label>
	        <Input type="date" id="startDate" name="startDate" placeholder="Enter the earliest date from which you wish articles to appear" onChange={this.onFormChange} />
	      </FormGroup>
	      <FormGroup>
	        <Label for="endDate">End Date</Label>
	        <Input type="date" id="endDate" name="endDate" placeholder="Enter the latest date from which you wish articles to appear" onChange={this.onFormChange} />
	      </FormGroup>
	      <Button onClick={this.props.submitSearch}>Search</Button>
      </Form>	    
		)
	}

}

export default Search;
