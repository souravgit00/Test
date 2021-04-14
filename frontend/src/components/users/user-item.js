import React from "react"
import {NavLink} from 'react-router-dom'

const UserItem = props => {

    return (
        <React.Fragment>
            <NavLink to={`/users/${props.id}`}>
                <li>Name: {props.name}</li>
                <li>Email : {props.email}</li>
                <li>Phone : {props.phone}</li>
                <li>City : {props.city}</li>
            </NavLink>
            <hr/>
        </React.Fragment>
    )
}

export default UserItem;