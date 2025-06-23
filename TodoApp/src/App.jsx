import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';

function App() {
const [todo, setTodo] = useState("")
const [todos, setTodos] = useState([])
const [showFinished, setshowFinished] = useState(true)

useEffect(() => {
    let todoString= localStorage.getItem("todos");
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
    }
}, [])

const ToggleFinished = (params) => {
  
  setshowFinished(!showFinished);
    
}


const saveToLS =(params) => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

const HandleEdit = (e,id) => {

  let t = todos.filter(i=>i.id === id)
  setTodo(t[0].todo)

  
  let newTodos = todos.filter((item) => {
    return item.id !== id; // Filter out the todo item with the matching id
  });

  setTodos(newTodos);

  saveToLS();
  
}

const HandleDelete = (e,id) => {
  
  // let index = todos.findIndex((item) =>{
  //   return item.id === id; // Find the index of the todo item
  // });

  let newTodos = todos.filter((item) => {
    return item.id !== id; // Filter out the todo item with the matching id
  });

  setTodos(newTodos);

  saveToLS();

}

const HandleAdd = () => {

  if(todo.trim() === "" || todo.length < 3) {
    return;    
  }
 
  setTodos([...todos, {id: uuidv4(),todo, isCompleted: false}])

  setTodo("") // Clear the input field after adding
  saveToLS();

 // console.log(todos) 
}

const HandleChange = (e) => {


  setTodo(e.target.value) // Update the todo state with the input value

}

const HandleCheckbox = (e) => {
  let id = e.target.name;

  let index = todos.findIndex(item=>{
    return item.id === id; // Find the index of the todo item
  });

  let newTodos = [...todos];

  newTodos[index].isCompleted = !newTodos[index].isCompleted; // Toggle the isCompleted state

  setTodos(newTodos); // Update the todos state with the modified array
  saveToLS();

}


  return (
    <>
    <Navbar />
      <div className='md:container md:mx-auto mx-3 my-5 p-5 rounded-xl bg-violet-100 min-h-[80vh] md:w-[35%]'>
        <h1 className='font-bold text-center text-2xl '>My Tasks - Manage my Tasks at one place</h1>
         <div className='add-todo my-5 flex flex-col gap-4' >
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className='flex'>
            <input onChange={HandleChange} onKeyDown={(e) => {e.key==='Enter' && HandleAdd() }}
           value={todo} className='bg-white w-full rounded-lg px-5 py-1' type='text' />

          <button onClick={HandleAdd} disabled={todo.length < 3} 
          className='bg-violet-800 disabled:bg-violet-400 hover:bg-violet-950 p-4 mx-2 py-2 text-sm font-bold text-white rounded-lg'>Save</button>
            
            </div>
          
        </div>

        <input id='show' className="my-4 mr-1" type="checkbox" onChange={ToggleFinished} checked={showFinished}  />
        <label className='mx-2' for='show'> Show Finished </label>

        <div className='h-[1px] bg-violet-950 opacity-15 w-[85%] mx-auto my-2'></div>
        
        <h2 className='text-lg font-bold'>My Todos</h2>

       
          <div className='todos'>

            {todos.length === 0 && <div className='text-center text-gray-500'>No Todos Available</div>}

            {
              todos.map(item=>{  

            return (showFinished || !item.isCompleted) && <div key={item.id}
             className='todo flex justify-between my-3 items-center'>

              <div className='flex gap-5'>
              <input name={item.id} onChange={HandleCheckbox} type='checkbox' checked={item.isCompleted} 
               id='' />

              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                
                </div>

             
              <div className='buttons flex h-full'>
                <button onClick={(e) => {HandleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => {HandleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>

            </div>

              })
            }


          </div>
      </div>
      
    </>
  )
}

export default App
