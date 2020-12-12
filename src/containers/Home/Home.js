import React from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";

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
		const mongo = this.props.user.mongoClient("mongodb-atlas");
		const mongoCollection = mongo.db("BillSplit").collection("Bills");

		const queryFilter = { _partition: "userInfo" , name: this.props.user.profile.email};
		const groupListResult = await mongoCollection.findOne(queryFilter);

		let groupList = Promise.resolve(Promise.resolve(groupListResult));
		groupList.then((groupObj) => {
			this.setState({ groupList : groupObj.groupList });
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
			<div className="container-fluid">
				
					{
						this.state.groupList.map((group) => (
							<div className="row">
								<Link to={`/${group}`}>{group}</Link>
							</div>
					))}

				<Form id="groupForm" inline>
				 <Form.Row>
				 	<Form.Label srOnly>New Group</Form.Label>
					<Form.Control id="groupName" size="sm" type="text" placeholder="New Group" />
				 </Form.Row>
 				<Button 
					variant="outline-dark" 
					type="button"
					onClick={this.handleAddGroup} >Add
				</Button>
				</Form>
			</div>
		);
	}
}

export default Home;