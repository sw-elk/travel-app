import React, {useEffect, useState, useMemo, useRef, useCallback } from 'react';
import './todoList.css'

let isSeq = Date.now()
const Control = (props) =>{
  const { addTodo} = props;
  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const newText = inputRef.current.value.trim()
    if( newText.length === 0){
      return;
    }
    addTodo({
      id:++isSeq,
      text:newText,
      competle:false
    })
    inputRef.current.value == ''
  }
   return (
      <div className="control">
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
          <input type="text" className="nee-todo" ref={inputRef}/>
        </form>
      </div>
    )
}
const TodoItem = (props)=> {
  const {toggleTodo, removeTodo ,todo:{ id, text, competle}} = props

  const onChange = () => {
    toggleTodo(id)
  };

  const onRemove = () => {
    removeTodo(id)
  };

  return(
     <li className="todo-item">
       <input type="text"
        onChange= {onChange}
        checked={competle}
       /> 
      <label className={competle?'competle':''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
     </li>
  )
}

const  Todos = (props) => { 
  const { todos, toggleTodo, removeTodo } = props;
  return(
    <ul>
        {
          todos.map(todo => {
            return (
               <TodoItem
               key={todo.id}
               toggleTodo={toggleTodo}
               removeTodo= {removeTodo}
               todo ={todo}
               />
            )
          })
        }
    </ul>
  )
   
}
let LS_KEY = '_$lskey_'
const TodoList = () => {
  const [todos,setTodos] = useState([]) 

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo] )
  },[]);
  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(
      todo => {
        return todo.id != id
      }
    ))
  },[]);
  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(
      todo => {
        return  todo.id === id ? {...todo, competle:!todo.competle } : todo
      }
    ))
  },[]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos);
  },[])

  useEffect(() => {
    localStorage.setItem( LS_KEY, JSON.stringify(todos));
  },[todos])
  return (
    <div className="todo-list">
      <Control addTodo={addTodo}></Control>
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}></Todos>
    </div>
  )
  
}

export default TodoList;
