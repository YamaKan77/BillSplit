import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import NativeMenu from 'native-menu'

import defaultImg from "../../assets/RR.JPG";

export default function GroupCard({ group, handleDeleteGroup }) {

  const img = group.img ? group.img : defaultImg;

  return (
    <NativeMenu items={[
      {
        primary: 'Delete',
        onClick: () => handleDeleteGroup(group)
      },
      ]}>
    	<Link to={`/${group.groupName}`}>
    		<Card className="groupCard" >
    			<Card.Img className="groupImage" src={img} alt="Card image" />
    			<Card.ImgOverlay>
  	  			<Card.Body>
  	  				<Card.Title>{group.groupName}</Card.Title>
  	  			</Card.Body>
  	  		</Card.ImgOverlay>
    		</Card>
    	</Link>
    </NativeMenu>
  );
};