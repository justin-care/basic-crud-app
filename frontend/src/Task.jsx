
import {motion} from "framer-motion"
import { Checkbox } from "flowbite-react"
import {MdDelete} from "react-icons/md"
import { useDispatch } from "react-redux"


const Task = ({id, title, description, done, handleDeleteTask, handleUpdateTask}) => {
    const dispatch = useDispatch();
    return (
        (!done) ?
        <motion.div className="w-full flex flex-row justify-between items-center p-4 px-6 gap-6 bg-slate-700 rounded-md" initial={{ opacity: 0, y: -15, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.8 }}
        transition={{ duration: 0.2, ease: "easeInOut" }} whileHover={{ scale: 1.02 }} >
            <Checkbox className="w-6 h-6 cursor-pointer" onChange={() => handleUpdateTask({id, title, description, done: !done})}  defaultChecked={done} />
            <h1 className="text-2xl font-bold w-40">{title}</h1>
            <p className="flex-1">{description}</p>
            <motion.button className="text-2xl cursor-pointer border-2 border-red-500 text-red-500 hover:text-slate-50 hover:bg-red-500 p-2 rounded-md transition duration-150 ease-out" onClick={() => handleDeleteTask(id)}>
                <MdDelete />
            </motion.button>
        </motion.div>
        :
        <div className="w-full flex flex-row justify-between items-center p-4 px-6 gap-6 bg-slate-700 rounded-md line-through pointer-events-none opacity-50">
            <Checkbox className="w-6 h-6 pointer-events-none text-slate-500" defaultChecked={done} />
            <h1 className="text-2xl font-bold w-40">{title}</h1>
            <p className="flex-1">{description}</p>
            <button className="text-2xl cursor-pointer border-2 border-slate-500 text-slate-500 p-2 rounded-md">
                <MdDelete />
            </button>
        </div>
    )
}

export default Task