import React from "react";

export default function OwedAmount({ totalOwedBills, user }) {
	const covered = totalOwedBills[user] && totalOwedBills[user].covered ? totalOwedBills[user].covered : new Map();
	const owes = totalOwedBills[user] && totalOwedBills[user].owes ? totalOwedBills[user].owes : new Map();
	let listItems = [];
	let index = 0;
	for (let [key, value] of covered.entries()) {
	  let item = <div key={index++} style={{backgroundColor: "green"}} >{key} owes you ${value} total</div>;
	  listItems.push(item);
	}
	for (let [key, value] of owes.entries()) {
	  let item = <div key={index++} style={{backgroundColor: "red"}}>You owe {key} ${value} total</div>;
	  listItems.push(item);
	}
	return (
		<div className="owedList col-sm-4">
			<ul >
				{listItems}
			</ul>
		</div>
	)
}