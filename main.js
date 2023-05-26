let tasksDiv = document.querySelector(".tasks");
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let clear = document.querySelector(".remove");
let container = document.querySelector(".container");

// Add Array to Store the Tasks
let arrayOfTasks = [];

// Check if Theres Tasks in Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLoaclStorage();

// add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task to Array of Tasks
        input.value = ""; // Empty Input
    }
}
// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page
        e.target.parentElement.remove();    
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed for The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
    }
    // Clear Button
    if (e.target.classList.contains("remove")) {
        clearTaskWith(e.target.tasks);
        e.target.tasksDiv.remove();  
    }
});

function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task to Array of Tasks
    arrayOfTasks.push(task);
    // Add Tasks to Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks to Loacl Storage
    addDataToLocalStorageFrom(arrayOfTasks);
    // For Testing
    // console.log(arrayOfTasks);
    // console.log(JSON.stringify(arrayOfTasks));
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Task Div
    tasksDiv.innerHTML = "";
    // Looping Array of Tasks
    arrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        // Check if Task if Done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Append Span to Div
        div.appendChild(span);
        // Add Task Div to Tasks Container
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLoaclStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
};

// function clearTaskWith() {
//     if (clearTaskWith() === true) {
//         tasksDiv.innerHTML = "";
//         localStorage.removeItem("tasks");
//     }
//     addDataToLocalStorageFrom(arrayOfTasks);
// }