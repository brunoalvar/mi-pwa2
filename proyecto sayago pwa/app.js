
const texto = document.getElementById("texto");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const agregar = document.getElementById("agregar");
const borrarCompletadas = document.getElementById("borrarCompletadas");

// Recuperar las tareas guardadas
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Guardar las tareas
function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Mostrar las tareas en pantalla
function mostrar() {
    lista.innerHTML = "";

    tareas.forEach((tarea, indice) => {
        const elemento = document.createElement("li");
        const nombre = document.createElement("span");
        const botonBorrar = document.createElement("button");

        nombre.textContent = tarea.texto;
        botonBorrar.textContent = "Eliminar";

        if (tarea.hecha) {
            elemento.classList.add("hecha");
        }

        // Marcar o desmarcar una tarea
        nombre.addEventListener("click", () => {
            tarea.hecha = !tarea.hecha;
            guardar();
            mostrar();
        });

        // Eliminar una tarea
        botonBorrar.addEventListener("click", () => {
            tareas.splice(indice, 1);
            guardar();
            mostrar();
        });

        elemento.append(nombre, botonBorrar);
        lista.appendChild(elemento);
    });

    // Actualizar el contador
    const pendientes = tareas.filter(tarea => !tarea.hecha).length;

    contador.textContent =
        pendientes + (pendientes === 1
            ? " tarea pendiente"
            : " tareas pendientes");
}

// Agregar una tarea
function agregarTarea() {
    const nombre = texto.value.trim();

    if (nombre === "") {
        texto.focus();
        return;
    }

    tareas.push({
        texto: nombre,
        hecha: false
    });

    texto.value = "";

    guardar();
    mostrar();
    texto.focus();
}

// Botón Agregar
agregar.addEventListener("click", agregarTarea);

// Agregar al presionar Enter
texto.addEventListener("keydown", evento => {
    if (evento.key === "Enter") {
        agregarTarea();
    }
});

// Borrar todas las tareas completadas
borrarCompletadas.addEventListener("click", () => {
    tareas = tareas.filter(tarea => !tarea.hecha);
    guardar();
    mostrar();
});

// Mostrar las tareas al abrir la aplicación
mostrar();

