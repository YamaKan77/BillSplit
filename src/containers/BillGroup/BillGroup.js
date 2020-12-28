import React from 'react';
import AddBill from '../Presentation/AddBill';
import OwedList from '../Presentation/OwedList';
import TotalSplit from '../Presentation/TotalSplit';
import Profile from '../Presentation/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import BillDataService from "../../services/bill.service.js";

import './BillGroup.scss';

export class BillGroup extends React.Component {


	constructor(props) {
		super(props);

		this.state = {selectedUsers : []};
		this.handleAdd = this.handleAdd.bind(this);
		this.handleUserSelect = this.handleUserSelect.bind(this);
		this.setOwedBills = this.setOwedBills.bind(this);
		this.handleSelectAll = this.handleSelectAll.bind(this);
		this.handleSplitType = this.handleSplitType.bind(this);
	}

	async componentDidMount() {
		this.setOwedBills();
		this.getTotalOwed();
		this.getUserList();
	}

	async getOwedBills() {
		try {
	    const mongo = this.props.user.mongoClient("mongodb-atlas");
			const mongoCollection = mongo.db("BillSplit").collection("Bills");

			const findManyQueryFilter = (
					{ $and: [
						{ $or: [{billFrom: this.props.user.profile.email}, {billTo: this.props.user.profile.email}] },
						{ groupName: this.props.match.params.groupName}

						]}
				 );
			const allowedBillsResult = await mongoCollection.find(findManyQueryFilter);

			return allowedBillsResult;
		} catch(error) {
			console.log(error);
		}
	}

	setOwedBills() {

		let body = {
			email: this.props.user.profile.email,
			groupName: this.props.match.params.groupName,
		}
		BillDataService.getAll().then(response => {
			console.log(response.data);
		})



		// let billResult = Promise.resolve(this.getOwedBills());
		// let owedBills = Promise.resolve(billResult);
		// owedBills.then((v) => {
		// 	this.setState({ owedBills : v});
		// })
	}


	calculateTotalOwedBills(bill, totalOwedBills, type) {
		let billForUser = (type === 'covered') ? bill.billFrom : bill.billTo;
		let billToUser = (type === 'covered') ? bill.billTo : bill.billFrom;

		// Check if the user has already been added
		if(!totalOwedBills.hasOwnProperty(billForUser)) {
			let typeMap = new Map();

			typeMap.set(billToUser, parseInt(bill.billAmount));
			let user = {};
			user[type] = typeMap;
			totalOwedBills[billForUser] = user;
		} else {
			// Check if a type (covered, owes) map already exists
			if(totalOwedBills[billForUser].hasOwnProperty(type)) {
				let typeMap = totalOwedBills[billForUser][type];
				// Check if covered person is already added
				if(!typeMap.has(billToUser)) {
					typeMap.set(billToUser, parseInt(bill.billAmount));
				} else {
					let amount = typeMap.get(billToUser);
					amount += parseInt(bill.billAmount);
					typeMap.set(billToUser, amount);
				}
			} else {
				// No type (covered, owes) map exists
				let user = totalOwedBills[billForUser];
				// Check if a owes map exists so it doesn't get overwritten
				let otherType = (type === 'covered') ? 'owes' : 'covered';
				// Other type of map already exists, calculate difference
				if(totalOwedBills[billForUser].hasOwnProperty(otherType)) {
					let otherTypeMap = totalOwedBills[billForUser][otherType];
					if(otherTypeMap.has(billToUser)) {
						let otherAmount = otherTypeMap.get(billToUser);

						if(otherAmount - bill.billAmount > 0) {
							otherTypeMap.set(billToUser, otherAmount - bill.billAmount);
						} else if(otherAmount - bill.billAmount < 0) {
							let typeMap = new Map();

							typeMap.set(billToUser, parseInt(bill.billAmount) - otherAmount);
							user[type] = typeMap;
						} else {
							otherTypeMap.delete(billToUser);
						}
					} else {
						// User has otherType map but doesn't include billToUser so new type map created
						let typeMap = new Map();

						typeMap.set(billToUser, parseInt(bill.billAmount));

						let user = totalOwedBills[billForUser];
						user[type] = typeMap;
						totalOwedBills[billForUser] = user;
					}
				} else {
					// User is completely new
					let typeMap = new Map();

					typeMap.set(billToUser, parseInt(bill.billAmount));

					let user = {};
					user[type] = typeMap;
					totalOwedBills[billForUser] = user;
				}
			}
		}
	}

	async getTotalOwed() {
		const mongo = this.props.user.mongoClient("mongodb-atlas");
		const mongoCollection = mongo.db("BillSplit").collection("Bills");

		const findManyQueryFilter = { _partition: "Bill", groupName: this.props.match.params.groupName};
		const allBillsResult = await mongoCollection.find(findManyQueryFilter);

		let allBills = Promise.resolve(Promise.resolve(allBillsResult));
		let totalOwedBills = {};
		allBills.then((bills) => {
			bills.forEach(bill => {
				// Check owed amounts for logged in user only
				if(this.props.user.profile.email === bill.billFrom) {
					this.calculateTotalOwedBills(bill, totalOwedBills, 'covered');
				}
				if(this.props.user.profile.email === bill.billTo) {
					this.calculateTotalOwedBills(bill, totalOwedBills, 'owes');
				}
			});
			this.setState({ totalOwedBills : totalOwedBills});
		})
	}

	async getUserList() {
		const mongo = this.props.user.mongoClient("mongodb-atlas");
		const mongoCollection = mongo.db("BillSplit").collection("Bills");

		const queryFilter = { _partition: "group", groupName: this.props.match.params.groupName};
		const groupResult = await mongoCollection.findOne(queryFilter);

		let groupObject = Promise.resolve(Promise.resolve(groupResult));
		groupObject.then((group) => {
			this.setState({ allUsers : group.participants, selectUserList: group.participants});
		})
	}


	async insertBills(owedBills) {
		try {
			let user = this.props.user;

	    const mongo = user.mongoClient("mongodb-atlas");
			const mongoCollection = mongo.db("BillSplit").collection("Bills");

			mongoCollection.insertMany(owedBills);
			
		} catch(error) {
			console.log(error);
		}
	}

	handleAdd() {
		// Prevent the page from refreshing
		// event.preventDefault();
		let billName = document.getElementById("billName").value;
		let billAmt = document.getElementById("billAmt").value;
		let billedTo = this.state.selectedUsers;
		let splitType = document.getElementById("splitType").value;

		let user = this.props.user;

		// Change bill amount depending on split type
		if(splitType === "Split Bill Amount") {
			if(billedTo.includes(user.profile.email)) {
				let splitBy = billedTo.length - 1;
				billAmt = billAmt / splitBy;
				billedTo = billedTo.filter(user => user !== this.props.user.profile.email);
			} else {
				billAmt = billAmt / billedTo.length;
			}
		}

		let newBills = [];
		let owedBills = this.state.owedBills;
		let totalOwedBills = this.state.totalOwedBills;
		for(let i = 0; i < billedTo.length; i++) {
			let bill = {
										billFromId : user.id,
										billName : billName,
										billTo : billedTo[i],
										billFrom : this.props.user.profile.email,
										billAmount : billAmt.toFixed(2),
										groupName : this.props.match.params.groupName,
										_partition: 'Bill'
									};

			this.calculateTotalOwedBills(bill, totalOwedBills, 'covered');

			newBills.push(bill);
			owedBills.push(bill);
		}

		this.insertBills(newBills);
		this.setState({owedBills : owedBills, totalOwedBills : totalOwedBills});

		document.getElementById("add-bill").reset();
		this.setState({selectedUsers : []});
	}

	handleUserSelect(event) {
		const selectedUsers = this.state.selectedUsers;
		let index;

		if(event.target.checked) {
			selectedUsers.push(event.target.value);
		} else {
			index = selectedUsers.indexOf(event.target.value);
			selectedUsers.splice(index, 1);
		}

		this.setState({selectedUsers: selectedUsers});
	}

	handleSelectAll() {
		let selectedUsers = this.state.selectedUsers;
		let users = this.state.selectUserList;
		if(users.length === selectedUsers.length) {
			selectedUsers = [];
		} else {
			users.filter(user => !selectedUsers.includes(user)).map((user) => selectedUsers.push(user));
		}

		this.setState({selectedUsers: selectedUsers});
	}

	handleSplitType() {
		let splitType = document.getElementById("splitType").value;
		let user = this.props.user;
		let email = user.profile ?  user.profile.email : "";

		if(splitType === "Charge Each Amount") {
			let users = this.state.selectUserList;
			users = users.filter(user => user !== email);
			this.setState({ selectUserList : users});
		} else {
			let selectUserList = this.state.allUsers;
			this.setState({ selectUserList : selectUserList});
		}
	}

	render() {
			return (
				<Container fluid className="container-fluid">
					<Row className="row">
						<Col><h1 className = "groupName" >{this.props.match.params.groupName}</h1></Col>
						<Col md="auto"><Profile /></Col>
					</Row>
					<br/>
					<Row className="row" >
						<AddBill 	handleAdd={this.handleAdd} 
										 	users={this.state.selectUserList ? this.state.selectUserList : []} 
										 	currentUser={this.props.user.profile ? this.props.user.profile.email : ''}
										 	selectedUsers={this.state.selectedUsers}
										 	handleUserSelect={this.handleUserSelect}
										 	handleSelectAll={this.handleSelectAll}
										 	handleSplitType={this.handleSplitType}/>
						<TotalSplit className = "col-sm-6"
												owedBills={this.state.owedBills} />
						<OwedList className = "col-sm-3"
											totalOwedBills = {this.state.totalOwedBills || {}}
											user = {this.props.user.profile.email || {}} />
					</Row>

				</Container>
			);
	}

}



export default withRouter(BillGroup);