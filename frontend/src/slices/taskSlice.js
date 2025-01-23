import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_BACKEND_LOCATION

const fetchTasks = createAsyncThunk(
    "task/fetchTasks",
    async () => {
        const response = await axios.get(api + "/tasks")
        return response.data
    }
);

const addTask = createAsyncThunk(
    "task/addTask",
    async (task) => {
        const response = await axios.post(api + "/tasks", task)
        return response.data
    }
);

const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (id) => {
        const response = await axios.delete(api + `/tasks?id=${id}`)
        return response.data
    }
);

const updateTask = createAsyncThunk(
    "task/updateTask",
    async (task) => {
        const response = await axios.put(api + `/tasks`, task)
        return response.data
    }
);

export const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = "fetched"
            state.tasks = action.payload
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        .addCase(fetchTasks.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload)
        })
        .addCase(addTask.rejected, (state, action) => {
            state.status = "add task failed"
            state.error = action.error.message
        })
        .addCase(addTask.pending, (state, action) => {
            state.status = "adding task"
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks = action.payload
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.status = "delete task failed"
            state.error = action.error.message
        })
        .addCase(deleteTask.pending, (state, action) => {
            state.status = "deleting task"
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id)
            state.tasks[index] = action.payload
        })
        .addCase(updateTask.rejected, (state, action) => {
            state.status = "update task failed"
            state.error = action.error.message
        })
        .addCase(updateTask.pending, (state, action) => {
            state.status = "updating task"
        })
    }
});

export {addTask,deleteTask,updateTask, fetchTasks}
export default taskSlice.reducer