import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Search extend Component {
	render() {
		return (
			<Form>
				<FormGroup>
          <Label for="searchTerms">Keyword</Label>
          <Input type="search" name="search" id="searchTerms" placeholder="Enter a search term" />
        </FormGroup>
			</Form>
			<FormGroup>
        <Label for="startDate">Start Date</Label>
        <Input type="date" name="date" id="startDate" placeholder="Enter the earliest date from which you wish articles to appear" />
      </FormGroup>
      <FormGroup>
        <Label for="endDate">End Date</Label>
        <Input type="date" name="date" id="endDate" placeholder="Enter the latest date from which you wish articles to appear" />
      </FormGroup>
		)
	}
}

export default Search;