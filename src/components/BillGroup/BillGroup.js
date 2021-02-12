import React from 'react';
import AddBill from '../AddBill';
import OwedAmount from '../OwedAmount';
import AllBills from '../AllBills';
import Profile from '../Profile';
import InviteUser from '../InviteUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import BillDataService from "../../services/bill.service.js";
import GroupDataService from "../../services/group.service.js";
import icon from "../../assets/Divy Up.png";
import S3FileUpload from 'react-s3';
import axios from 'axios';

import './BillGroup.scss';

export class BillGroup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {	selectedUsers : [],
										cardImg : null,
									};
		this.handleAdd = this.handleAdd.bind(this);
		this.handleUserSelect = this.handleUserSelect.bind(this);
		this.getOwedBills = this.getOwedBills.bind(this);
		this.getTotalOwed = this.getTotalOwed.bind(this);
		this.handleSelectAll = this.handleSelectAll.bind(this);
		this.handleSplitType = this.handleSplitType.bind(this);
		this.handleInviteUser = this.handleInviteUser.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
	}

	async componentDidMount() {
		this.getOwedBills();
		this.getUserList();
	}

	getOwedBills() {

		let body = {
			email: this.props.user.profile.email,
			groupName: this.props.match.params.groupName,
		}
		BillDataService.getAll(body).then(response => {
			this.setState({ owedBills : response.data}, function() { this.getTotalOwed()});
		})

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
							otherTypeMap.delete(billToUser);
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

	getTotalOwed() {
		let allBills = this.state.owedBills;
		let totalOwedBills = {};
		allBills.forEach(bill => {
			// Check owed amounts for logged in user only
			if(this.props.user.profile.email === bill.billFrom) {
				this.calculateTotalOwedBills(bill, totalOwedBills, 'covered');
			}
			if(this.props.user.profile.email === bill.billTo) {
				this.calculateTotalOwedBills(bill, totalOwedBills, 'owes');
			}
		});
		this.setState({ totalOwedBills : totalOwedBills});
	}

	async getUserList() {

		let body = {
			_partition: "Group",
			groupName: this.props.match.params.groupName,
		};
		GroupDataService.findUserList(body).then(response => {
			this.setState({ allUsers : response.data[0].participants, selectUserList: response.data[0].participants});
		});
	}


	async insertBills(newBills) {
		try {

			BillDataService.insert(newBills).then(response => {
				this.getOwedBills();
			});
			
		} catch(error) {
			console.log(error);
		}
	}

	handleAdd() {
		// Prevent the page from refreshing
		// event.preventDefault();
		let billName = document.getElementById("billName").value;
		let billAmt = parseInt(document.getElementById("billAmt").value);
		let billedTo = this.state.selectedUsers;
		let splitType = document.getElementById("splitType").value;

		let user = this.props.user;

		// Change bill amount depending on split type
		if(splitType === "Split Bill Amount") {
			if(billedTo.includes(user.profile.email)) {
				billAmt = billAmt / billedTo.length;
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

			newBills.push(bill);
			owedBills.push(bill);
		}

		this.insertBills(newBills);

		document.getElementById("billName").value = "";
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

	handleInviteUser() {
		let allUsers = this.state.allUsers;
		let email = document.getElementById("email").value;

		if(!allUsers.includes(email)) {
			allUsers.push(email);

			let body = {
				groupName: this.props.match.params.groupName,
				participants : allUsers
			}
			GroupDataService.update(body);

			this.setState({allUsers: allUsers});

			document.getElementById("emailForm").reset();
		}
	}

	handleFileUpload = event => {

		let file = event.target.files[0];
	  let fileName = file.name;
	  let fileType = file.type;
		const formData = new FormData();
		formData.append('img', file);
		formData.append('groupName', this.props.match.params.groupName);
		formData.append('fileName', fileName);

		GroupDataService.upload(formData);

	}

	handleDeleteItem(bill) {
		let owedBills = this.state.owedBills;
		BillDataService.delete(bill._id).then(response => {
			const index = owedBills.indexOf(bill);
			owedBills.splice(index, 1);
			
			this.getTotalOwed();
			this.setState({owedBills : owedBills});
		})
	}

	render() {
			return (
				<Container fluid>
					<Row>
						<Col md="auto"><img className="icon" src={icon}/></Col>
						<Col className = "groupNameContainer">
							<InviteUser groupName={this.props.match.params.groupName} 
													handleInviteUser={this.handleInviteUser}
													handleFileUpload={this.handleFileUpload} />
						</Col>
						<Col md="auto"><Profile /></Col>
					</Row>
					<br/>
					<Row>
						<AddBill 	handleAdd={this.handleAdd} 
										 	users={this.state.selectUserList ? this.state.selectUserList : []} 
										 	currentUser={this.props.user.profile ? this.props.user.profile.email : ''}
										 	selectedUsers={this.state.selectedUsers}
										 	handleUserSelect={this.handleUserSelect}
										 	handleSelectAll={this.handleSelectAll}
										 	handleSplitType={this.handleSplitType}/>
						<AllBills className = "col-sm-6"
											owedBills={this.state.owedBills}
											handleDeleteItem={this.handleDeleteItem} />
						<OwedAmount className = "col-sm-3"
											totalOwedBills = {this.state.totalOwedBills || {}}
											user = {this.props.user.profile.email || {}} />
					</Row>

				</Container>
			);
	}

}



export default withRouter(BillGroup);