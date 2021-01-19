import React from "react";
import * as Realm from "realm-web";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Formik} from 'formik';
import * as Yup from "yup";


import '../BillGroup/BillGroup.scss';
import icon from "../../assets/Divy Up.png";

export default function Login({ setUser }) {
	const REALM_APP_ID = "billsplit-enxhm"; // e.g. myapp-abcde
	const app = new Realm.App({ id: REALM_APP_ID });
	const history = useHistory();

  function AttemptLogin(setUser) {
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;
		
		loginEmailPassword(email, password).then(user => {
			history.push("/");
		})

	}

	async function loginEmailPassword(email, password) {
		const credentials = Realm.Credentials.emailPassword(email, password);
		try {
			//Authenticate the user
			const user = await app.logIn(credentials);
			setUser(user);
			return user;
		} catch(err) {
			console.error("Failed log in", err);
		}
	}

	function keyPress(e) {
		if(e.keyCode === 13) {
			AttemptLogin(setUser);
		}
	}

	async function SignUp() {
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;

		await app.emailPasswordAuth.registerUser(email, password);
	}

	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.required("Required")
			.email("Must be valid email"),
	});


	return (
	<Container fluid md="auto" className="loginContainer">
		<Formik 
			validationSchema={LoginSchema}
			onSubmit= {(values, {resetForm}) => {
				AttemptLogin(setUser);
			}}
			initialValues= {{
				email: '',
				password: '',
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
	      <Form className="loginForm" 
	      			autoComplete="off" 
	      			onSubmit={handleSubmit} 
	      			id="emailForm">

    			<Row>
    				<img className="homeIcon" src={icon}/>
    			</Row>
	      	<Row>
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
					</Row>
					<Row>
						<Col className="idCol" xs={3}>
			        <Form.Control 
			        	id="password"
			        	name="password"
			        	type="password" 
			        	onChange={handleChange}
			        	onBlur={handleBlur}
			        	value={values.password}
			        	isValid={!errors.password}
			        	onKeyDown={keyPress}
			        	placeholder="Password"
			        	size="sm"/>
			        	{errors.password && <div>{errors.password}</div>}
		       	</Col>
					</Row>
					<Row>
		       	<Col>
			      	<Button id="profile-button"
			      					type="submit" 
			      					className="button"
			      					size="sm">
			      		Login
							</Button>
			      	<Button id="profile-button" 
			      					type="button" 
			      					className="button"
			      					onClick={() => {SignUp()}}
			      					size="sm">
			      		Sign Up
							</Button>
						</Col>
					</Row>
	      </Form>

			)}
		</Formik>

	</Container>

	);
};