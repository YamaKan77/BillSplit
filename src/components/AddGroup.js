import React from 'react';

import { Formik} from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from "yup";

export default function AddGroup({handleAddGroup}) {

	const AddGroupSchema = Yup.object().shape({
		groupName: Yup.string()
			.required("Required"),
	});

	return(
			<Formik 
				validationSchema={AddGroupSchema}
				onSubmit= {(values, {resetForm}) => {
					handleAddGroup();
					resetForm({ values: ''});
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
		      <Form className="groupContainer" 
		      			autoComplete="off" 
		      			onSubmit={handleSubmit} 
		      			id="groupForm">
		        <Form.Label>Group Name</Form.Label>
		        <Form.Control 
		        	id="groupName"
		        	name="groupName"
		        	type="text" 
		        	onChange={handleChange}
		        	onBlur={handleBlur}
		        	value={values.groupName}
		        	isValid={!errors.groupName}
		        	size="sm"/>
		        	{errors.groupName && <div>{errors.groupName}</div>}
		      	<Button variant="outline-dark" 
		      					type="submit" 
		      					className="button">
						Add
						</Button>
		      </Form>

				)}
			</Formik>


	);
}