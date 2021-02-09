import React from 'react';
import UserList from './UserList';

import { Formik} from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from "yup";

export default function AddBill({handleAdd, users, currentUser, selectedUsers, handleUserSelect, handleSelectAll, handleSplitType}) {

	const AddBillSchema = Yup.object().shape({
		billName: Yup.string()
			.required("Required"),

		billAmt: Yup.number()
			.required("Required")
			.positive("Amount must be postive.")
			.integer(),

	});


	return(
			<Formik 
				validationSchema={AddBillSchema}
				onSubmit= {(values) => {
					handleAdd();
				}}
				initialValues= {{
					billName: '',
					billAmt: '',
				}}
			>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors
				}) => (
		      <Form className="col-sm-2 addBill" autoComplete="off" onSubmit={handleSubmit} id="add-bill">
		        <Form.Label>Bill Name</Form.Label>
		        <Form.Control 
		        	className="billInput"
		        	id="billName"
		        	name="billName"
		        	type="text" 
		        	onChange={handleChange}
		        	onBlur={handleBlur}
		        	value={values.billName}
		        	isValid={touched.billName && !errors.billName}/>
		        	{touched.billName && errors.billName && <div>{errors.billName}</div>}<br/>
	        	<Form.Label>Bill Amount</Form.Label>	
		        <Form.Control 
		        	className="billInput"
		        	id="billAmt" 
		        	name="billAmt"
		        	type="text" 
		        	onChange={handleChange}
		        	onBlur={handleBlur}
		        	value={values.billAmt}
		        	isValid={touched.billAmt && !errors.billAmt}/>
		        	{touched.billAmt && errors.billAmt && <div>{errors.billAmt}</div>}<br/>
		        <Form.Control 
		        	className="splitType" 
		        	id="splitType" 
		        	onChange={handleSplitType}
		        	as="select" 
		        	size="sm">
		        	<option>Split Bill Amount</option>
		        	<option>Charge Each Amount</option>
		        </Form.Control>
		        <UserList name="selectedUsers" id="selectedUsers" value={values.selectedUsers} users = {users} currentUser={currentUser} selectedUsers={selectedUsers} handleUserSelect={handleUserSelect}/>
		      	<Button type="submit" 
		      					className="profile-button"
		      					size="sm">
						Add
						</Button>
		      	<Button type="button" 
		      					className="profile-button"
		      					onClick={handleSelectAll} 
		      					size="sm">
						{(users.length === selectedUsers.length) ? "Clear" : "Select All"}
						</Button>
		      </Form>

				)}
			</Formik>


	);
}