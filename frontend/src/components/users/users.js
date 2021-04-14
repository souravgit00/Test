import React, {useState, useEffect} from "react";

import UserList from './user-list'

const Users = () => {

    const [ loadedUsers, setLoadedUsers ] = useState();

    useEffect( () => {
        fetch('http://localhost:5000/api/users')
        .then(res=>res.json())
        .then(res2 => {
            setLoadedUsers(res2.users)
        })
    },[])

    return (
        <ul>       
            { loadedUsers && <UserList items={loadedUsers} /> }
        </ul>
    );
}

export default Users;