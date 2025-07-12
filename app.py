from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

# database connection
bd = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "123456",
    database = "todolist"
)

cursor = bd.cursor(dictionary=True)

@app.route('/')
def index():
    return render_template('index.html')

# Ruta para obtener todas las tareas
@app.route('/api/tasks', methods=["GET"])
def get_tasks():
    cursor.execute("SELECT * FROM tasks WHERE checked = 0")
    tasks = cursor.fetchall()
    return jsonify(tasks)

# Ruta para crear una nueva tarea
@app.route('/api/tasks', methods=["POST"])
def create_task():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    date = data.get("date")

    if not title or not description or not date:
        return jsonify({"error": "Faltan campos"}), 400

    # Guarda la tarea en MySQL
    sql = "INSERT INTO tasks (title, description, date) VALUES (%s, %s, %s)"
    values = (title, description, date)
    cursor.execute(sql, values)
    bd.commit()

    new_task_id = cursor.lastrowid  # id de la nueva tarea

    return jsonify({
        "task": {
            "id_task": new_task_id,
            "checked": False,
            "title": title,
            "description": description,
            "date": date
        }
    }), 201
# Ruta para actualizar una tarea
@app.route('/api/tasks/<int:task_id>', methods=["PUT"])
def update_task(task_id):
    data = request.json
    title = data['title']
    description = data['description']

    sql = "UPDATE tasks SET title = %s, description = %s WHERE id_task = %s"
    cursor.execute(sql, (title, description, task_id))
    bd.commit()

    return jsonify({"message": "Task updated successfully"})

# Ruta para eliminar una tarea
@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    print(f"🗑️ Eliminando la tarea {task_id}...")  # Debug
    cursor = bd.cursor()
    try:
        # Verificar si existe la tarea
        cursor.execute("SELECT * FROM tasks WHERE id_task = %s", (task_id,))
        task = cursor.fetchone()
        if not task:
            return jsonify({"error": "Task not found"}), 404

        # Borrar la tarea
        cursor.execute("DELETE FROM tasks WHERE id_task = %s", (task_id,))
        bd.commit()
        return jsonify({"message": f"Task {task_id} deleted successfully"}), 200
    except Exception as e:
        print("🔥 Error:", e)
        return jsonify({"error": "Internal server error"}), 500

# Ruta para marcar una tarea como completada
@app.route('/api/tasks/<int:task_id>/check', methods=["PUT"])
def check_task(task_id):
    try:
        data = request.json
        checked = data.get("checked", False)

        sql = "UPDATE tasks SET checked = %s WHERE id_task = %s"
        cursor.execute(sql, (checked, task_id))
        bd.commit()

        return jsonify({"message": f"Task {task_id} marked as {'completed' if checked else 'not completed'}"}), 200
    except Exception as e:
        print(f"🔥 Error al marcar la tarea {task_id} como completada: {e}")
        return jsonify({"error": "Internal server error"}), 500

#Ruta para ver tareas completadas o no completadas
@app.route('/api/tasks/view', methods=["GET"])
def view_tasks():
    cursor.execute("SELECT * FROM tasks WHERE checked = 1")
    tasks = cursor.fetchall()
    return jsonify(tasks)

@app.route('/api/tasks/search', methods=["GET"])
def search_tasks():
    keyword = request.args.get('keyword', '')

    sql = "SELECT * FROM tasks WHERE title LIKE %s"
    cursor.execute(sql, ('%' + keyword + '%',))
    tasks = cursor.fetchall()
    return jsonify(tasks)


if __name__ == '__main__':
    app.run(debug=True)
