package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/rs/cors"
)

// Task represents a task in the task manager API.
type Task struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`
	Done bool `json:"done"`
}

//basic in-memory "database"
var tasks []Task
var lorem string


// main sets up the routes for the API and starts the server.
// It listens on port 8080.
func main(){
	initTasks()
	mux:= http.NewServeMux()
	mux.HandleFunc("/tasks", taskHandler)

	handler:= cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
		AllowCredentials: true,
	}).Handler(mux)

	fmt.Println("server is running on port 8080...")
	http.ListenAndServe(":8080", handler)
}

func taskHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method{
	case "POST":
		addTask(w,r)
	case "GET":
		getTasks(w,r)
	case "DELETE":
		deleteTask(w,r)
	case "PUT":
		updateTask(w,r)
	}
}

// getTasks responds with a JSON representation of all tasks in the tasks
// slice. It is called when a GET request is made to /tasks.
func getTasks(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

// addTask adds a new task to the tasks slice. It is called when a POST request
// is made to /tasks. It expects a JSON body with a "title" field, and will
// respond with the newly created task in JSON format. If the request body is
// invalid, it will return a 400 status code.
func addTask(w http.ResponseWriter, r *http.Request){
	var newTask Task
	if err := json.NewDecoder(r.Body).Decode(&newTask); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newTask.ID = len(tasks) + 1
	tasks = append(tasks, newTask)
	fmt.Println(newTask)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newTask)
	
}

// updateTask updates the Done field of a task in the tasks slice. It is called when
// a PUT request is made to /tasks. It expects a JSON body with a "done" field, and
// will respond with the updated task in JSON format. If the task is not found, it
// will return a 404 status code. If the request body is invalid, it will return a
// 400 status code.
func updateTask(w http.ResponseWriter, r *http.Request){
	var updatedTask Task
	if err := json.NewDecoder(r.Body).Decode(&updatedTask); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for i, task := range tasks {
		if task.ID == updatedTask.ID{
			tasks[i].Done = updatedTask.Done
			fmt.Println("Task done:")
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(tasks[i])
			return
		}
	}

	http.Error(w, "Task not found...", http.StatusNotFound)
}

// deleteTask deletes a task from the tasks slice. It is called when a DELETE
// request is made to /tasks. It expects a query parameter "id" with the ID of
// the task to be deleted. If the task is not found, it will return a 404 status
// code. If the request is invalid, it will return a 400 status code.
func deleteTask(w http.ResponseWriter, r *http.Request){
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	for i, task := range tasks {
		if task.ID == id{
			tasks = append(tasks[:i],tasks[i+1:]... )
			fmt.Println("Task deleted:")
			fmt.Println(tasks)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(tasks)
			return
		}
	}

	http.Error(w, "Task not found...", http.StatusNotFound)
}

// initTasks populates the tasks slice with a few sample tasks. It is called once
// when the server starts, and is useful for testing and development. It is not
// intended for use in production.
func initTasks(){
	lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis non qui excepturi dolorum in, placeat nisi minus exercitationem possimus quod reprehenderit consectetur earum doloribus voluptatibus amet perspiciatis ipsa? Alias, perspiciatis!"
	count := 4
	for i := 0; i < count; i++ {
		tasks = append(tasks, Task{ID: i+1, Title: "Sample Task " + strconv.Itoa(i+1), Done: false, Description: lorem})
	}
}