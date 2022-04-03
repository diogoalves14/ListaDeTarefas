let input = document.getElementById("input")

let addButton = document.getElementById("addButton")

let taskName = document.getElementById("taskName")

let tasks = document.getElementById("tasks")

let taskArray = []

reloadTasks()

function showTasks() {
    let newLi = ""

    taskArray.forEach((task, index) => {
        newLi = newLi + `
        <li class="list ${task.complete == true ? "complete" : ""}">
            <button class="buttonCheck" onclick="completeTask(${index})"><i class="fa-solid fa-circle-check"></i></button>
                <p id="taskName" class="taskName ${task.complete == true ? "complete" : ""}">${task.task}</p>
            <button class="buttonTrash" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
        </li>
        `
    })

    tasks.innerHTML = newLi

    localStorage.setItem("list", JSON.stringify(taskArray))
}

function deleteTask(index) {
    taskArray.splice(index, 1)

    showTasks()
}

function addTask() {
    if (input.value) {

        taskArray.push({
            task: input.value,
            complete: false
        })
    } else {
        alert("Adicione uma tarefa")
    }

    input.value = ""

    showTasks()
}

function completeTask(index) {
    taskArray[index].complete = !taskArray[index].complete

    showTasks()
}

function reloadTasks() {
    let myTasks = localStorage.getItem("list")

    if (myTasks) {
        taskArray = JSON.parse(myTasks)

        showTasks()
    }


}

function addByEnter(keys) {
    if (keys.key === "Enter") {
        addTask()
    }
}

addButton.addEventListener("click", addTask)

document.addEventListener("keypress", addByEnter)