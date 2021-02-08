import React from "react";

import NativeMenu from 'native-menu'
import { ListGroup } from 'react-bootstrap';

export default function AllBills({ owedBills, handleDeleteItem }) {
	return (
		<div className="allBills col-sm-6">
			<ListGroup className="splitList">
				{
					owedBills ? owedBills.map((bill, index) => (
						<NativeMenu items={[
				      {
				        primary: 'Delete',
				        onClick: () => handleDeleteItem(bill)
				      },
			      ]}>	
							<ListGroup.Item action key={index}>{bill.billTo} owes {bill.billFrom} : ${bill.billAmount} for {bill.billName}</ListGroup.Item>
						</NativeMenu>
					)) : <br/>}
			</ListGroup>
		</div>
	)
}