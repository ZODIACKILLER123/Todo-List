function addTaskToDOM(task) {
    const site = document.getElementById("task-list-p");
    const li = document.createElement("li");
    li.id =  task.id_task; // Agregar "task-" prefix para consistencia

    li.innerHTML = `
        <div class="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-md">
            <input type="checkbox" class="mr-2" ${task.checked ? "checked" : ""}>
            <div class="bg-green-600 w-full rounded-lg p-2 text-gray-50">
                <span class="font-bold text-lg">${task.title}</span>
                <p class="infor-p hidden">${task.description} - ${task.date}</p>
            </div>
            <button class="w-7 bg-purple-400 rounded-lg ml-2 hover:bg-purple-600 hover:text-gray-50 text-center">↓</button>
            <button class="w-7 bg-red-600 rounded-lg ml-2 hover:bg-red-900 text-center" id="${task.id_task}">🗑️</button>
            <button class="w-7 bg-cyan-600 rounded-lg ml-2 hover:bg-cyan-900 text-center">✏️</button>
        </div>
    `;

    site.appendChild(li);
}


document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/tasks")
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => addTaskToDOM(task)); // Agrega cada tarea al HTML
        })
        .catch(error => console.error("Error cargando tareas:", error));
});

const create_task = document.getElementById('create-task-dialog');
const showButton = document.getElementById("create");
const hideButton = document.getElementById("close-window");
const addtask = document.getElementById("add-task");


showButton.addEventListener("click", () => {
    console.log("Show create task dialog");
    create_task.showModal();
});

hideButton.addEventListener("click", () => {
    create_task.close();
});

addtask.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    const taskname = document.getElementById("name-task").value;
    const description = document.getElementById("description-task").value;
    const date = document.getElementById("date-task").value;

    if (!taskname || !description || !date) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Send the task data to the server
    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: taskname,
            description: description,
            date: date
        })
    })
    .then(res => res.json())
    
    .then(data => {
        console.log("Task added: ", data);
        addTaskDOM(data.task);
        create_task.close(); // Close the dialog after adding the task
    })
    .catch(err => {
        console.error("Error adding task: ", err);
        alert("Error al agregar la tarea. Por favor, inténtalo de nuevo.");
    });
});

function addTaskDOM(task) {
    const site = document.getElementById("task-list-p");

    const newLi = document.createElement("li");
    newLi.id = "task-" + task.id_task;

    const taskDiv = document.createElement("div");
    taskDiv.className = "flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-md";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.checked;
    checkbox.className = "mr-2";

    const infoDiv = document.createElement("div");

    const span = document.createElement("span");
    span.className = "font-bold text-lg";
    span.textContent = task.title;

    const p = document.createElement("p");
    p.className = "infor-p hidden";
    p.textContent = task.description + " - " + task.date;

    infoDiv.appendChild(span);
    infoDiv.appendChild(p);

    const btnInfo = document.createElement("button");
    btnInfo.className = "w-7 bg-purple-400 rounded-lg ml-2 hover:bg-purple-600 hover:text-gray-50 text-center";
    btnInfo.textContent = "↓";

    const btnDelete = document.createElement("button");
    btnDelete.className = "w-8 bg-red-600 rounded-lg ml-2 hover:bg-red-900 text-center";
    btnDelete.textContent = "🗑️";

    const btnEdit = document.createElement("button");
    btnEdit.className = "w-8 bg-cyan-600 rounded-lg ml-2 hover:bg-cyan-900 text-center";
    btnEdit.textContent = "✏️";

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(infoDiv);
    taskDiv.appendChild(btnInfo);
    taskDiv.appendChild(btnDelete);
    taskDiv.appendChild(btnEdit);

    newLi.appendChild(taskDiv);
    site.appendChild(newLi);
}

