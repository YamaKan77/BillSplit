import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';

import defaultImg from "../../assets/RR.JPG";

export default function GroupCard({ group }) {

  const img = group.img ? group.img : defaultImg;

  return (
  	<Link to={`/${group.groupName}`}>
  		<Card className="groupCard" >
  			<Card.Img fluid src={img} alt="Card image" />
  			<Card.ImgOverlay>
	  			<Card.Body>
	  				<Card.Title>{group.groupName}</Card.Title>
	  			</Card.Body>
	  		</Card.ImgOverlay>
  		</Card>
  	</Link>
  );
};