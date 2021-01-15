import React from 'react';
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import Profile from '../Profile';
import { Link } from "react-router-dom";
import GroupDataService from "../../services/group.service.js";
import AddGroup from '../AddGroup';
import GroupCard from './GroupCard.js';
import * as Realm from "realm-web";
import icon from "../../assets/Divy Up.png";

import './Home.scss';

const REALM_APP_ID = "billsplit-enxhm"; 
const app = new Realm.App({ id: REALM_APP_ID });

export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groupList: [],
			user: app.currentUser,
		};
		this.getGroupList = this.getGroupList.bind(this);
		this.handleAddGroup = this.handleAddGroup.bind(this);
	}

	componentDidMount() {
		this.getGroupList();
	}

	getGroupList() {

		let data = { user : this.state.user.profile.email};
		GroupDataService.findUserGroups(data).then(response => {
			let groups = response.data.map(function(group) { return group.groupName});
			this.setState({ groupList : groups});
		})
	}

	handleAddGroup() {
		let groupName = document.getElementById("groupName").value;

		let groupList = this.state.groupList;
		groupList.push(groupName);

		let participants = [this.state.user.profile.email];

		let data = {
			_partition : "Group",
			groupName : groupName,
			participants : participants
		}

		GroupDataService.insert(data).then(response => {

			this.setState({ groupList : groupList });
		})

		document.getElementById("emailForm").reset();
	}

	render() {
		return(
			<Container fluid>
					<Row>
						<Col md="auto"><img className="icon" src={icon} alt="Logo icon" /></Col>
						<Col className="groupNameCol"><h1 className="groupName">Divy Up</h1></Col>
						<Col md={2}><Profile /></Col>
					</Row>
					<Row className="groupList">
						<CardGroup className="cardGroup" >
							{
								this.state.groupList.map((group) => (
									
										<GroupCard group={group} />
									
							))}
						</CardGroup>
						<Col className="groupInput ml-auto" ><AddGroup handleAddGroup={this.handleAddGroup} /></Col>
					</Row>
			</Container>
		);
	}
}

export default Home;