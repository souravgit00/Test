import React from 'react';

import UserItem from './user-item';

const UserList = props => {

  if (props.items.length === 0) {
    return (
        <h2>No users found.</h2>
    );
  }

  return (
    <ul>
      <h2>Users List : </h2>
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          phone={user.phone}
          city={user.city}
          todoCount={user.todos.length}
        />
      ))}
    </ul>
  );
};

export default UserList;
