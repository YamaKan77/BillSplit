import React from "react";
import * as Realm from "realm-web";
import AuthenticationButton from '../../components/AuthenticationButton';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Profile = () => {
  const REALM_APP_ID = "billsplit-enxhm"; 
  const app = new Realm.App({ id: REALM_APP_ID });

  const [user] = React.useState(app.currentUser);

  return (
    user && (
      <div className = "profile" >
        <h4>{user.name}</h4>
        <p>{user.profile.email}</p>
        <AuthenticationButton /> 
        <Link to="/">
          <Button type="button">
            Home
          </Button>
        </Link>
      </div>
    )
  );
};

export default Profile;