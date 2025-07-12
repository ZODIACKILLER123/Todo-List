document.getElementById("unchecked-tasks-list").addEventListener("click", (event) => {
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


document.getElementById("unchecked-tasks-list").addEventListener("click", (event) => {
    
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

document.getElementById("search-results").addEventListener("click", (event) => {
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


document.getElementById("search-results").addEventListener("click", (event) => {
    
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