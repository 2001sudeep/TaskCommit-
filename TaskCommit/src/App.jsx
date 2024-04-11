import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished , setShowFinished] = useState(true)
  useEffect(() => {
   let todoString = localStorage.getItem("todos");
   if(todoString){
     let todos = JSON.parse(todoString)
     setTodos(todos) 
    }
  }, [])
  

 const saveToLS = () => {
  localStorage.setItem("todos",JSON.stringify(todos))    
  }

  const toggleFinished = (e) => {
      setShowFinished(!showFinished)
  }
  
  
  const handleDelete = (e , id) => {
    let newTodos = todos.filter(item=>{
      return item.id != id;
    })

    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id != id;
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })    
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()

  }
  

  return (
    <>
    <Navbar/>
     <div className="mx-3 md:container min-h-[80vh] md:mx-auto my-5 rounded-xl p-5 bg-gradient-to-r from-purple-200 via-purple-200 to-purple-400  md:w-[35%]">
      <div className="addTodo flex flex-col my-5 gap-4">
        <h1 className='text-xl font-bold text-center'>Task-Commit App</h1>
        <h2 className="text-lg font-bold">Add a Todo</h2>
        <div className='flex'>
        <input onChange={handleChange} placeholder='Write here' value={todo} type="text" className='w-full rounded-full px-5 py-1'/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-600 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full mx-2 '>Commit</button>
        </div>
      </div>
      <input onChange={toggleFinished} type="checkbox" checked={showFinished} />
      <label className='mx-2' htmlFor="show">Show Finished</label>
      <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
      <h1 className='text-xl font-bold'>Your todos</h1>
      <div className="todos">
        {todos.length===0 && <div className='m-5'>No Todos to display</div> }
  {todos.map(item => {
    return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-1 mx-1 md:w-1/2">
      <div className='flex gap-5 m-2'>
      <input name={item.id} onChange={handleCheckbox} id='' type="checkbox" checked={item.isCompleted} />
      <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
      </div>
      <div className="buttons flex h-full">
        <button onClick={(e)=>{handleEdit(e,item.id)}} className=' bg-violet-600 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit/></button>
        <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-600 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete/></button>
      </div>
    </div>
})}
</div>

     </div>
    </>
  )
}

export default App