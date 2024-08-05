document.addEventListener('DOMContentLoaded', function () {
    const listaTareas = document.getElementById('listaTareas');

    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActual) {
        console.error('No hay usuario actual en localStorage');
        return;
    }
    console.log(usuarioActual.nombre);
    console.table(usuarioActual.tareas); // Mostrar tareas en la consola

    if (usuarioActual.tareas.length === 0) {
        listaTareas.innerHTML = '<p>No hay tareas disponibles</p>';
        return;
    }

    usuarioActual.tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = `${tarea.nombre} - ${tarea.detalle} a las ${tarea.hora}`;
        listaTareas.appendChild(li);
    });
});
