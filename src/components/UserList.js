import React from 'react';
import { Form } from 'react-bootstrap';

export default function UserList({ users, currentUser, selectedUsers, handleUserSelect }) {
	return (
		<div>
			{
				users.map((user) => (
						<div key={user}>
							<Form.Check
								className="checkboxValue"
								id={user}
								type="checkbox"
								value={user}
								onChange={handleUserSelect}
								checked={ selectedUsers.includes(user)}
								label={user}
							/>
						</div>
				))}
		</div>
	)
}

