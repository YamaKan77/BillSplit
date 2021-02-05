import React from 'react';

import { Formik} from 'formik';
import { Button, Form, Row, Col } from 'react-bootstrap';
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
		      	<Row className="formRow">
			      	<Col className="formGroupName">
			        <Form.Control 
			        	id="groupName"
			        	name="groupName"
			        	className="formGroupName"
			        	type="text" 
			        	onChange={handleChange}
			        	onBlur={handleBlur}
			        	value={values.groupName}
			        	isValid={!errors.groupName}
			        	placeholder="Group Name"
			        	size="sm"/>
			        	{errors.groupName && <div>{errors.groupName}</div>}
			      	</Col>
				      	<Button variant="outline-dark" 
				      					type="submit" 
				      					size="sm"
				      					className="button">
								Add
								</Button>
						</Row>
		      </Form>

				)}
			</Formik>


	);
}