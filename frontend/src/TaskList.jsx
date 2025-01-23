import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "./slices/taskSlice";
import {AnimatePresence } from "framer-motion";
import Task from "./Task";

const TaskList = ({tasks, handleDeleteTask, handleUpdateTask}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks())
    },[dispatch])
    return(
        <div className="w-full h-auto flex flex-col gap-4 mb-6">
            <AnimatePresence>
                {tasks.tasks.map(task => <Task key={task.id} id={task.id} title={task.title} description={task.description} done={task.done} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask} />)}
            </AnimatePresence>
        </div>
    )
}

export default TaskList;