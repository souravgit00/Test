import React,{ useState, useEffect } from "react"
import {useParams} from 'react-router-dom'

import TodoList from './todo-list'

const Todo = props => {

    const userId = useParams().userId
    const [ loadedTodos, setLoadedTodos] = useState();
    const [ inputVal, setInputVal ] = useState('')

    //GET todo for the selected User
    useEffect( ()=> {
        fetch(`http://localhost:5000/api/todos/user/${userId}`)
        .then(res=>res.json())
        .then(res2 => {
            setLoadedTodos(res2.todos)
        })
    },[userId])

    //ONchange Input Event
    const inputChangeHandler = (event) => {
        setInputVal(event.target.value)
    }

    //Add Todo
    const formSubmitHandler = () => {
        fetch(`http://localhost:5000/api/todos`, 
            { 
                method : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({ title: inputVal, creator : userId  })
            }
        )
        .then(res=>{
            props.history.push('/users')
        })
    }

    return (
        <ul>
            <br />
            <form onSubmit={formSubmitHandler}>
              Add Todo: <input type="text" onChange={ inputChangeHandler } value={inputVal} />&nbsp;
              <button >Submit</button>
            </form>
            <hr />
            <br /> 
            <br />     
            { loadedTodos && <TodoList items={loadedTodos}/> }
        </ul>
    );
}

export default Todo;