import React from "react";
import * as Realm from "realm-web";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const REALM_APP_ID = "billsplit-enxhm"; // e.g. myapp-abcde
	const app = new Realm.App({ id: REALM_APP_ID });
  const history = useHistory();

	function logout() {
		app.currentUser.logOut();
		// window.location.reload(false);
    history.push("/login");

	}

  return (
    <button onClick={() => logout()}>
      Log Out
    </button>
  );
};

export default LogoutButton;