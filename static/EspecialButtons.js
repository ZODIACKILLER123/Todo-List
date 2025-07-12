const viewtask_true = document.getElementById("ViewTasks_true");
const viewtask_false = document.getElementById("ViewTasks_false");
const viewTasksF = document.getElementById("viewTasksF");
const close2 = document.getElementById("close-window2");

const searchButton = document.getElementById("search")

const searchDialog = document.getElementById("search-dialog");
const closeSearch = document.getElementById("close-window3");


function taskfound(task) {
    const site = document.getElementById("search-results");
    const li = document.createElement("li");
    li.id = task.id_task; // Agregar "task-" prefix para consistencia

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

searchButton.addEventListener("click", () => {
    const word = prompt("Ingrese la palabra a buscar: ");
    searchTasks(word);
});

function searchTasks(keyword) {
    fetch(`/api/tasks/search?keyword=${encodeURIComponent(keyword)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tasks => {
            console.log("Tareas encontradas:", tasks);
            document.getElementById("search-results")
            .innerHTML = ""; // Limpiar resultados anteriores
            tasks.forEach(task => taskfound(task));
        })
        .catch(error => console.error("Error buscando tareas:", error));
    searchDialog.showModal();
}

closeSearch.addEventListener("click", () => {
    searchDialog.close();
});


function listTasksun(task) {
    const site = document.getElementById("unchecked-tasks-list");
    const li = document.createElement("li");
    li.id = task.id_task; // Agregar "task-" prefix para consistencia

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

viewtask_true.addEventListener("click", () => {
    console.log("Showing checked tasks");
    fetch("/api/tasks/view")
        .then(response => response.json())
        .then(tasks => {
            document.getElementById("unchecked-tasks-list").innerHTML = "";
            tasks.forEach(task => listTasksun(task));
        })
        .catch(error => console.error("Error cargando tareas:", error));
    viewTasksF.showModal();
    document.getElementById("unchecked-tasks-list").addEventListener("change", (event) => {
    if (event.target.matches("input[type='checkbox']")) {
        const taskDiv = event.target.closest("div").querySelector("div.bg-green-600, div.bg-red-600");

        if (event.target.checked) {
            taskDiv.classList.remove("bg-green-600");
            taskDiv.classList.add("bg-red-600");
        } else {
            console.log("Checkbox is unchecked");
            taskDiv.classList.remove("bg-red-600");
            taskDiv.classList.add("bg-green-600");
        }

        const task = event.target.closest("li");
        const taskId = task.id;
        const checked = event.target.checked;
        console.log("Task ID: ", taskId, "Checked: ", checked);
        fetch(`http://127.0.0.1:5000/api/tasks/${taskId}/check`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checked: checked })
        })
    }
});
})

close2.addEventListener("click", () => {
    viewTasksF.close();
})