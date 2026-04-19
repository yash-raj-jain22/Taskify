import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState(() => {
    const todoString = localStorage.getItem("Todos")
    return todoString ? JSON.parse(todoString) : []
  })
  const [showFinished, setShowFinished] = useState(false)

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  }, [Todos])



  const handleCheck = (e, index) => {
    const updatedTodos = Todos.map((todo, i) =>
      i === index ? { ...todo, isCompleted: e.target.checked } : todo
    );

    setTodos(updatedTodos);
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const handleEdit = (index) => {
    setTodo(Todos[index].todo);
    const updatedTodos = Todos.filter((item, i) => i !== index);
    setTodos(updatedTodos);
    return index;

  };
  const handleDelete = (index) => {
    const updatedTodos = Todos.filter((item, i) => i !== index);
    setTodos(updatedTodos);
  };
  const handleAddTask = () => {
    if (Todo.length > 0) {
      setTodos([...Todos, { todo: Todo, isCompleted: false }]);
      setTodo("");
    }
    else {
      alert("Please enter a task before adding.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="main min-h-screen bg-gradient-to-r from-indigo-300 to-purple-300 flex justify-center items-start p-4">
        <div className="container  md:mx-auto p-4 md:mt-20 bg-indigo-100 rounded-lg min-h-120">
          <div className="heading flex flex-col justify-center items-center mb-4">
            <h1 className="md:text-4xl text-3xl text-center font-bold mb-7 underline">Taskify- Manage all your tasks</h1>
            <h1 className="md:text-3xl text-2xl font-bold mb-10">ToDo List</h1>
          </div>
          <div className="input flex justify-between items-center mb-4">
            <input type="text" onChange={handleChange} value={Todo} placeholder='Enter a new task...' className='h-15 md:h-20 bg-slate-50 border-t-2 border-l-2 border-b-2  rounded-l-2xl p-2 focus:outline-none  focus:border-black focus:bg-white border-blue-500  w-full ' />
            <button onClick={handleAddTask}   className={`font-bold  text-white px-4 py-2 mr-10 h-15 md:h-20 w-50 cursor-pointer rounded-r-2xl  ${Todo.length==0?"bg-blue-400 hover:bg-blue-400 hover:cursor-not-allowed":"bg-blue-500 hover:bg-blue-600"}`}>Add Task</button>
          </div>
          <div className="showFinished ">
            <input checked={showFinished} onChange={(e) => setShowFinished(e.target.checked)} type="checkbox" title="Show Finished" id="showFinished" className="w-4 h-4 cursor-pointer" />
            <label htmlFor="showFinished" className="ml-2 font-bold cursor-pointer">Show Finished</label>
          </div>
          <div className="separator border-b-2 border-indigo-300 mb-15 md:mb-8"></div>
          <div className="yourTasks">
            <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
          </div>
          <div className="todos ">
            <ul className="lists ">
              {Todos.length === 0 && <p className='text-center text-gray-500'>No tasks added yet. Start by adding a new task!</p>}
              {Todos.map(item => {
                return((showFinished || !item.isCompleted)) && (

                  <li key={Todos.indexOf(item)} className="todo p-6 border-2 rounded-2xl mb-5 flex justify-between items-center flex-col md:flex-row gap-3">
                    <div className="todoText flex items-center justify-center">
                      <input onChange={(e) => handleCheck(e, Todos.indexOf(item))} type="checkbox" name="completed" checked={item.isCompleted} id="" title="Mark as completed" className="check mr-5 p-2 appearance-none w-5 h-5 border-2 border-gray-500 rounded-full checked:bg-indigo-600 checked:border-indigo-600 cursor-pointer relative checked:after:content-[''] checked:after:block after:w-2 after:h-2 after:bg-white after:rounded-full after:absolute after:top-1 after:left-1" />
                      <span className={item.isCompleted ? "text-2xl line-through" : "text-2xl"}>{item.todo}</span>
                    </div>
                    <div className="buttons flex justify-center items-center">
                      <button onClick={() => handleEdit(Todos.indexOf(item))} className=' cursor-pointer bg-indigo-600 text-white mx-2 border rounded border-indigo-700 flex justify-center items-center px-3 py-1 gap-1 hover:bg-indigo-800'>Edit<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24"><title xmlns="">edit-todo</title><path fill="currentColor" d="M5 21h14c1.1 0 2-.9 2-2v-8h-2v8H5V5h8V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2" /><path fill="currentColor" d="M7 14v2c0 .55.45 1 1 1h2c.27 0 .52-.11.71-.29l7.65-7.65l-3.41-3.41L7.3 13.3a1 1 0 0 0-.29.71Zm13.71-7.29a.996.996 0 0 0 0-1.41l-2-2a.996.996 0 0 0-1.41 0l-1.65 1.65l3.41 3.41z" /></svg></button>
                      <button onClick={() => handleDelete(Todos.indexOf(item))} className=' cursor-pointer bg-indigo-600 text-white mx-2 border rounded border-indigo-700 flex justify-center items-center px-3 py-1 gap-1 hover:bg-indigo-800'>Delete<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24"><title xmlns="">delete-todo</title><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg></button>

                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
