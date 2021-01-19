import './App.css';
import React from 'react';
import BillGroup from './components/BillGroup/BillGroup';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
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
				<Route path="/:groupName">
					<BillGroup user={user} />
				</Route>
				<PrivateRoute user={user} path="/" component={Home} />
			</Switch>
		</div>
	);
}

export default App;
