import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Profile from '../Presentation/Profile';
import { Link } from "react-router-dom";
import GroupDataService from "../../services/group.service.js";


import '../BillGroup/BillGroup.scss';

export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groupList: [],
		};
		this.getGroupList = this.getGroupList.bind(this);
		this.handleAddGroup = this.handleAddGroup.bind(this);
	}

	async componentDidMount() {
		this.getGroupList();
	}

	async getGroupList() {

		let data = { user : this.props.user.profile.email};
		GroupDataService.findUserGroups(data).then(response => {
			let groups = response.data.map(function(group) { return group.groupName});
			this.setState({ groupList : groups});
		})


	}

	async handleAddGroup() {
		let groupName = document.getElementById("groupName").value;

		let groupList = this.state.groupList;
		groupList.push(groupName);

		const mongo = this.props.user.mongoClient("mongodb-atlas");
		const mongoCollection = mongo.db("BillSplit").collection("Bills");

		const queryFilter = { _partition: "userInfo" , name: this.props.user.profile.email};
		const update = { _partition: "userInfo", name: this.props.user.profile.email, groupList: groupList};
		// Insert or update
		const options = {upsert: true};

		await mongoCollection.updateOne(queryFilter, update, options);

		const groupQueryFilter = { _partition: "group", groupName: groupName};
		let participants = [this.props.user.profile.email];
		const update2 = { _partition: "group", groupName: groupName, participants: participants }

		await mongoCollection.updateOne(groupQueryFilter, update2, options);

		this.setState({ groupList : groupList });

		document.getElementById("groupForm").reset();
	}

	render() {
		return(
			<Container fluid className="container-fluid">
					<Row>
						<Col><h1 className = "groupName" >Bill Split</h1></Col>
						<Col md="auto"><Profile /></Col>
					</Row>
					<Row className="groupList">
						{
							this.state.groupList.map((group) => (
								
									<Link to={`/${group}`}>{group}</Link>
								
						))}
					</Row>
				<Form className="addGroup" id="groupForm" inline>
					<Form.Row>
						<Form.Label srOnly>New Group</Form.Label>
						<Form.Control id="groupName" size="sm" type="text" placeholder="New Group" />
					</Form.Row>
	 				<Button className="addButton"
						variant="outline-dark" 
						type="button"
						onClick={this.handleAddGroup} >Add
					</Button>
				</Form>
			</Container>
		);
	}
}

export default Home;