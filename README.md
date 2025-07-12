# 📝 To-Do List Web Application

<div align="center">

![To-Do List](image.png)

**Una aplicación web moderna y funcional para gestionar tus tareas diarias**

[![Flask](https://img.shields.io/badge/Flask-2.0+-blue.svg)](https://flask.palletsprojects.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-06B6D4.svg)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://www.mysql.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 🚀 Características Principales

✨ **Interfaz Moderna**: Diseño responsivo con TailwindCSS  
📱 **Totalmente Responsivo**: Funciona perfectamente en desktop y móvil  
⚡ **Tiempo Real**: Actualizaciones instantáneas sin recargar la página  
🗄️ **Persistencia de Datos**: Base de datos MySQL para almacenamiento seguro  
🎯 **Gestión Completa**: Crear, editar, marcar y eliminar tareas  
🔄 **API RESTful**: Backend robusto con Flask  

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **TailwindCSS** - Diseño y estilos modernos
- **JavaScript (ES6+)** - Interactividad y manejo del DOM
- **Fetch API** - Comunicación asíncrona con el backend

### Backend
- **Flask (Python)** - Framework web ligero
- **MySQL** - Base de datos relacional
- **mysql-connector-python** - Conector de base de datos

---

## 📦 Estructura del Proyecto

```
to-do_list/
├── 📁 static/
│   ├── 🟨 scripts.js          # Lógica principal de la aplicación
│   ├── 🟨 buttons.js          # Manejo de eventos de botones
│   ├── 🟨 buttons2.js         # Funcionalidades adicionales
│   └── 🟨 EspecialButtons.js  # Botones especializados
├── 📁 templates/
│   └── 🌐 index.html          # Plantilla principal
├── 🐍 app.py                  # Servidor Flask y API
├── 📦 package.json            # Dependencias de Node.js
├── 🗄️ todolist_db.session.sql # Esquema de base de datos
├── 🖼️ image.png               # Imagen de demostración
└── 📖 README.md               # Documentación del proyecto
```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos
- Python 3.8+
- MySQL 8.0+
- Node.js (para TailwindCSS)

### 1. Clonar el Repositorio
```bash
git clone https://github.com/ZODIACKILLER123/Todo-List.git
cd Todo-List
```

### 2. Configurar el Entorno Python
```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install flask mysql-connector-python
```

### 3. Configurar la Base de Datos
```sql
-- Crear base de datos
CREATE DATABASE todolist;

-- Usar la base de datos
USE todolist;

-- Crear tabla de tareas
CREATE TABLE tasks (
    id_task INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    checked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configurar TailwindCSS (Opcional)
```bash
npm install
npx tailwindcss build -o static/styles.css
```

### 5. Ejecutar la Aplicación
```bash
python app.py
```

La aplicación estará disponible en `http://127.0.0.1:5000`

---

## 🎯 Funcionalidades

### ✅ Gestión de Tareas

| Acción | Descripción | Endpoint |
|--------|-------------|----------|
| 📝 **Crear** | Agregar nuevas tareas con título, descripción y fecha | `POST /api/tasks` |
| 👁️ **Ver** | Visualizar todas las tareas pendientes | `GET /api/tasks` |
| ✏️ **Editar** | Modificar título y descripción de tareas existentes | `PUT /api/tasks/{id}` |
| ✅ **Marcar** | Marcar/desmarcar tareas como completadas | `PUT /api/tasks/{id}/check` |
| 🗑️ **Eliminar** | Remover tareas permanentemente | `DELETE /api/tasks/{id}` |

### 🎨 Interfaz de Usuario

- **Botón ↓**: Expandir/contraer descripción de la tarea
- **Botón ✏️**: Editar título y descripción
- **Botón 🗑️**: Eliminar tarea
- **Checkbox**: Marcar como completada/pendiente

---

## 🔧 API Endpoints

### 📚 Documentación de la API

```http
GET /api/tasks
```
Obtiene todas las tareas pendientes

```http
POST /api/tasks
Content-Type: application/json

{
    "title": "Mi nueva tarea",
    "description": "Descripción detallada",
    "date": "2025-01-15"
}
```

```http
PUT /api/tasks/{id}
Content-Type: application/json

{
    "title": "Título actualizado",
    "description": "Nueva descripción"
}
```

```http
PUT /api/tasks/{id}/check
Content-Type: application/json

{
    "checked": true
}
```

```http
DELETE /api/tasks/{id}
```

---

## 🎨 Personalización

### Colores de Estado
- 🟢 **Verde**: Tareas pendientes
- 🔴 **Rojo**: Tareas completadas
- 🟣 **Púrpura**: Botón de información
- 🔵 **Azul**: Botón de edición

### Modificar Estilos
Los estilos están implementados con TailwindCSS. Para personalizar:

1. Edita las clases en `templates/index.html`
2. Modifica los estilos en `static/scripts.js` para elementos dinámicos
3. Regenera el CSS con `npx tailwindcss build`

---

## 🚀 Próximas Características

- [ ] 🔍 Búsqueda y filtrado de tareas
- [ ] 📅 Vista de calendario
- [ ] 🏷️ Etiquetas y categorías
- [ ] 📊 Estadísticas y reportes
- [ ] 🔔 Notificaciones
- [ ] 👥 Compartir tareas
- [ ] 🌙 Modo oscuro

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `package.json` para más detalles.

---

## 👨‍💻 Autor

**ZODIACKILLER123**
- GitHub: [@ZODIACKILLER123](https://github.com/ZODIACKILLER123)

---

<div align="center">

**¡Gracias por usar To-Do List! ⭐**

Si te gusta este proyecto, no olvides darle una estrella ⭐

</div>