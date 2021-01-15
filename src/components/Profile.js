import React from "react";
import * as Realm from "realm-web";
import LogoutButton from './Login/LogoutButton';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Profile = () => {
  const REALM_APP_ID = "billsplit-enxhm"; 
  const app = new Realm.App({ id: REALM_APP_ID });

  const [user] = React.useState(app.currentUser);

  return (
    user && (
      <div className = "profile pull-right" >
        <h4>{user.name}</h4>
        <p>{user.profile.email}</p>
        <LogoutButton /> 
        <Link to="/">
          <Button className="profile-button" type="button" size="sm">
            Home
          </Button>
        </Link>
      </div>
    )
  );
};

export default Profile;