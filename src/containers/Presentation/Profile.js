import React from "react";
import * as Realm from "realm-web";
import AuthenticationButton from '../../components/AuthenticationButton';

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
      </div>
    )
  );
};

export default Profile;