let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let subject = document.getElementById("subjectInput").value;

let task = {
    text: taskText,
    subject: subject,
    completed: false
};

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        let newTask = document.createElement("li");

        let taskName = document.createElement("span");
        taskName.textContent = task.subject + " - " + task.text;
        if (task.completed) {
            taskName.style.textDecoration = "line-through";
        }

        let taskButtons = document.createElement("div");
        taskButtons.className = "task-buttons";

        let completeButton = document.createElement("button");
        completeButton.textContent = "✅";

        completeButton.onclick = function() {

            task.completed = !task.completed;

            saveTasks();

            displayTasks();
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";

        deleteButton.onclick = function() {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();
        };

        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(deleteButton);

        newTask.appendChild(taskName);
        newTask.appendChild(taskButtons);

        taskList.appendChild(newTask);
    });

    updateStats();
}

function updateStats() {

    let total = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    let pending = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;
}

displayTasks();