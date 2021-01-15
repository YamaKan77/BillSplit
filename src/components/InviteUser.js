import React from 'react';

import { Formik} from 'formik';
import { Button, Form, Row, Col } from 'react-bootstrap';
import * as Yup from "yup";

export default function InviteUser({handleInviteUser, groupName, handleFileUpload}) {

	const InviteUserSchema = Yup.object().shape({
		email: Yup.string()
			.required("Required")
			.email("Must be valid email"),
	});

	return(
			<Formik 
				validationSchema={InviteUserSchema}
				onSubmit= {(values, {resetForm}) => {
					handleInviteUser();
				}}
				initialValues= {{
					email: '',
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
		      <Form className="emailInvite" 
		      			autoComplete="off" 
		      			onSubmit={handleSubmit} 
		      			id="emailForm">
		      	<Row>
		      		<Col xs={5}>
								<h1 className= "groupNameHeader">
									{groupName}
								</h1>
							</Col>
		      		<Col >
				        <Form.File 
				        	id="custom-file"
				        	name="file"
				        	label="Group Image"
				        	onChange={(e) => handleFileUpload(e)}
				        	size="sm"
				        	custom />
			       	</Col>
		      		<Col className="idCol" xs={3}>
				        <Form.Control 
				        	id="email"
				        	name="email"
				        	type="text" 
				        	onChange={handleChange}
				        	onBlur={handleBlur}
				        	value={values.email}
				        	isValid={!errors.email}
				        	placeholder="Email"
				        	size="sm"/>
				        	{errors.email && <div>{errors.email}</div>}
			       	</Col>
			       	<Col xs={1}>
				      	<Button id="invite-button"
				      					variant="outline-dark" 
				      					type="submit" 
				      					className="button"
				      					size="sm">
									Invite
								</Button>
							</Col>
						</Row>
						<Row>

						</Row>
		      </Form>

				)}
			</Formik>


	);
}