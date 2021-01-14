import './App.css';
import React from 'react';
import BillGroup from './components/BillGroup/BillGroup';
import Home from './components/Home/Home';
import Login from './components/Login/LoginButton';
import * as Realm from "realm-web";
import {
	Switch,
	Route,
	Redirect
} from "react-router-dom";

const REALM_APP_ID = "billsplit-enxhm"; 
const app = new Realm.App({ id: REALM_APP_ID });

function App() {
	const [user, setUser] = React.useState(app.currentUser);

	const PrivateRoute = ({ user, ...props }) => 
		user ? <Route {...props} /> : <Redirect to="/login"/>;
	
	return (
		<div className="App">
			<Switch>
				<Route path="/login">
					<Login setUser={setUser} />
				</Route>
				<PrivateRoute user={user} path="/" component={Home} />
				<Route path="/:groupName">
					<BillGroup user={user} />
				</Route>

			</Switch>
		</div>
	);
}

export default App;
