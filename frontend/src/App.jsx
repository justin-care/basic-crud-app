import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Drawer, Toast} from 'flowbite-react';
import {FaRegWindowClose} from 'react-icons/fa'
import {HiCheckCircle, HiXCircle, HiInformationCircle} from 'react-icons/hi'
import TaskList from './TaskList'
import {addTask, updateTask, deleteTask, fetchTasks} from './slices/taskSlice'

import { useToast } from './useToast';

function App() {
    const {toasts, addToast} = useToast();
    const tasks = useSelector(state => state.tasks)
    const [open, setOpen] = useState(false);
    const[openTasks, setOpenTasks] = useState({tasks:[]});
    const[completedTasks, setCompletedTasks] = useState({tasks:[]});
    const initialTaskState = {
        id: 0,
        title: "",
        description: "",
        done: false
    }
    const [task, setTask] = useState({...initialTaskState});
    const dispatch = useDispatch();
  

    const handleAddTask = () => {
        let newTask = {...task, id: tasks.tasks.length + 1};
        dispatch(addTask(newTask));
        addToast("Task added successfully", "success");
        setTask({...initialTaskState});
        setOpen(false);
    }

    const handleUpdateTask = (task) => {
        dispatch(updateTask(task));
        addToast("Task updated successfully", "info");
    }

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
        dispatch(fetchTasks());
        addToast("Task deleted successfully", "error");
    }
    

    useEffect(() => {
        let newOpenTasks = {...tasks, tasks: tasks.tasks.filter(task => task.done === false)};
        let newCompletedTasks = {...tasks, tasks: tasks.tasks.filter(task => task.done === true)};
        setOpenTasks(newOpenTasks);
        setCompletedTasks(newCompletedTasks);
    }, [tasks])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="h-screen container mx-auto shadow-lg p-6 flex flex-col gap-4 mb-4 justify-start">
            <nav className="flex flex-row items-center justify-between">
                <h1 className="text-5xl font-bold mb-4">Tasks</h1>
                <div>
                <button className="text-2xl bg-teal-500 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-md" onClick={() => setOpen(true)}>Add Task</button>
                </div>
            </nav>
            <hr />
            <h2 className="text-3xl font-bold">Open Tasks:</h2>
            <TaskList tasks={openTasks} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} />
            {
                completedTasks.tasks.length > 0 &&
                <div className='w-full flex flex-col gap-4 justify-start'>
                    <hr />
                    <h2 className="text-3xl font-bold">Completed Tasks:</h2>
                    <TaskList tasks={completedTasks} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} />
                </div>
            }
            <Drawer backdrop={true} position="right" open={open} onClose={handleClose} className="bg-slate-800 w-1/3">
                <Drawer.Items className="bg-slate-800 text-2xl">
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex flex-row items-center justify-between p-4">
                            <h2 className="text-3xl font-bold">Add Task</h2>
                            <button className="text-3xl font-bold rounded-sm" onClick={handleClose}><FaRegWindowClose /></button>
                        </div>
                        <hr className="" />
                        <div className="flex flex-col gap-4 p-4">
                            <input type="text" name="title" id="title" placeholder="Title" className="border p-2 rounded-md text-slate-900" value={task.title} onChange={(e) => setTask({...task, title: e.target.value})} />
                            <textarea name="description" id="description" placeholder="Description" className="border p-2 rounded-md text-slate-900" rows="3" value={task.description} onChange={(e) => setTask({...task, description: e.target.value})}></textarea>
                            <button className="text-3xl w-1/2 font-bold rounded-sm bg-blue-500 hover:bg-blue-700 text-white p-4 self-center" onClick={handleAddTask}>Add</button>
                        </div>
                    </div>
                </Drawer.Items>
            </Drawer>
            <div className="fixed bottom-4 flex flex-col gap-2">
                {toasts.map((toast) => (
                <Toast key={toast.id} className="shadow-lg bg-slate-600 text-slate-50">
                    <div className="flex items-center">
                    {toast.type === 'success' && <HiCheckCircle className="mr-2 text-green-500" />}
                    {toast.type === 'error' && <HiXCircle className="mr-2 text-red-500" />}
                    {toast.type === 'info' && <HiInformationCircle className="mr-2 text-blue-500" />}
                    <span className="text-sm font-medium">{toast.message}</span>
                    </div>
                </Toast>
                ))}
            </div>
        </div>
    )
}

export default App
