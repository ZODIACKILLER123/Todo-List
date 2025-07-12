
document.getElementById("task-list-p").addEventListener("click", (event) => {
    const clickdBtn = event.target

    if (clickdBtn.textContent === "↓"){
        const taskDiv = clickdBtn.closest("div")
        const inforP = taskDiv.querySelector(".infor-p")

        inforP.classList.toggle("hidden")
    }

    if (clickdBtn.textContent === "✏️"){
        const taskDiv = clickdBtn.closest("div")
        const titleSpan = taskDiv.querySelector("span")
        const infoP = taskDiv.querySelector(".infor-p")

        const newTitle = prompt("Nuevo Titulo: ", titleSpan.textContent)
        if (newTitle) titleSpan.textContent = newTitle

        const newInfo = prompt("Nueva Informacion: ", infoP.textContent)
        if (newInfo) infoP.textContent = newInfo

        const task = event.target.closest("li")
        const taskId = task.id

        fetch(`http://127.0.0.1:5000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            title: newTitle,
            description: newInfo,
            })
        })
    }
})

document.getElementById("task-list-p").addEventListener("change", (event) => {
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

document.getElementById("task-list-p").addEventListener("click", (event) => {
    
    const taskLi = event.target.closest("li");
    if (taskLi && event.target.textContent === "🗑️") {
        console.log("Deleting task with ID: ", taskLi.id);
        
        fetch(`/api/tasks/${taskLi.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Task deleted: ", data);
            taskLi.remove(); // Remove the task from the DOM
        })
        .catch(err => {
            console.error("Error deleting task: ", err);
            alert("Error al eliminar la tarea. Por favor, inténtalo de nuevo.");
        });
    }
})

