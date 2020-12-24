import './App.css';
import React from 'react';
import BillGroup from './containers/BillGroup/BillGroup';
import Home from './containers/Home/Home';
import Login from './components/Login/LoginButton';
import * as Realm from "realm-web";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

const REALM_APP_ID = "billsplit-enxhm"; 
const app = new Realm.App({ id: REALM_APP_ID });


function App() {
	const [user, setUser] = React.useState(app.currentUser);


	return (
		<div className="App">
			<Switch>
				<Route path="/Login">
					<Login setUser={setUser} />
				</Route>
				<Route path="/:groupName">
					<BillGroup user={user} />
				</Route>
				<Route path="/">
					<Home user={user} />
				</Route>
			
			</Switch>
		</div>
	);
}

export default App;
