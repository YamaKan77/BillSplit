import React from "react";
import * as Realm from "realm-web";
import { useHistory } from "react-router-dom";

import { Button } from 'react-bootstrap';


export default function LoginEmailPassword({ setUser }) {
	const REALM_APP_ID = "billsplit-enxhm"; // e.g. myapp-abcde
	const app = new Realm.App({ id: REALM_APP_ID });
	const history = useHistory();

  function AttemptLogin(setUser) {
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;
		const credentials = Realm.Credentials.emailPassword(email, password);

		try {
			//Authenticate the user
			const user = app.logIn(credentials);
			setUser(user);
			history.push("/");
		} catch(err) {
			console.error("Failed log in", err);
		}
	}

	function keyPress(e) {
		if(e.keyCode === 13) {
			AttemptLogin(setUser);
		}
	}

	return (
	<div>
		<input type="text" id="email" placeholder="Email"/><br/>
		<input type="text" id="password" placeholder="Password" onKeyDown={keyPress} /><br/>
		<Button onClick={() => {AttemptLogin(setUser)}}>
		Log In
		</Button>
	</div>

	);
};