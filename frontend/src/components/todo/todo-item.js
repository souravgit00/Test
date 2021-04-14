import React from "react"
import { withRouter } from 'react-router-dom';

const TodoItem = props => {

    //Delete Todo
    const deleteTodoHandler = (todoid) => {
        fetch(`http://localhost:5000/api/todos/${todoid}`, { method : 'DELETE'})
        .then(res=>{
            props.history.push('/users')
        })
    }

    return (
        <ul>
            <li>{props.title}</li>
            <button type="submit" onClick={()=>deleteTodoHandler(props.id)}>Delete</button>
            <hr/>
        </ul>
    )
}

export default withRouter(TodoItem);