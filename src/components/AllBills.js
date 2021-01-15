import React from "react";

import { ListGroup } from 'react-bootstrap';

export default function AllBills({ owedBills }) {
	return (
		<div className="totalSplit col-sm-6">
			<ListGroup className="splitList">
				{
					owedBills ? owedBills.map((bill, index) => (
						<ListGroup.Item action key={index}>{bill.billTo} owes {bill.billFrom} : ${bill.billAmount} for {bill.billName}</ListGroup.Item>
					)) : <br/>}
			</ListGroup>
		</div>
	)
}