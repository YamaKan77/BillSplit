import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';

import img from "../../assets/RR.JPG";

export default function GroupCard({ group }) {

  return (
  	<Link to={`/${group}`}>
  		<Card className="groupCard" style={{ width: '15rem' }}>
  			<Card.Img fluid src={img} alt="Card image" />
  			<Card.ImgOverlay>
	  			<Card.Body>
	  				<Card.Title>{group}</Card.Title>
	  			</Card.Body>
	  		</Card.ImgOverlay>
  		</Card>
  	</Link>
  );
};