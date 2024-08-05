document.addEventListener('DOMContentLoaded', function () {
    const filtroTareasDia = document.getElementById('filtroTareasDia');
    const filtroTareasSemana = document.getElementById('filtroTareasSemana');
    const filtroTareasMes = document.getElementById('filtroTareasMes');
    const filtroTareas = document.getElementById('filtroTareas');
    const tareasContainer = document.getElementById('tareasContainer');
    const verTareasTemplate = document.getElementById('verTareasTemplate');

    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActual || !usuarioActual.tareas) {
        console.error('No hay tareas disponibles o no hay un usuario actual.');
        tareasContainer.innerHTML = '<p>No hay tareas disponibles</p>';
        return;
    }

    // Función para filtrar y mostrar tareas
    function mostrarTareas(filtro) {
        const contenedorTareas = document.getElementById('tareas');
        contenedorTareas.innerHTML = ''; // Limpiar el contenedor

        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

        if (!usuarioActual || !usuarioActual.tareas) {
            contenedorTareas.innerHTML = '<p>No hay tareas disponibles</p>';
            return;
        }

        const tareasFiltradas = usuarioActual.tareas.filter(tarea => {
            // Aquí puedes aplicar el filtro según la lógica que necesites
            return true; // Por ahora, muestra todas las tareas
        });

        tareasFiltradas.forEach((tarea, index) => {
            const tareaDiv = document.createElement('div');
            tareaDiv.classList.add('tarea');

            tareaDiv.innerHTML =

                `<div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <h5 class="card-title">${tarea.nombre}</h5>
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <p class="card-text">${tarea.detalle}</p>
                                        <p>Tipo: ${tarea.tipo}</p>
                                        <p>Hora: ${tarea.hora}</p>
                                        <p>Días de repetición: ${tarea.diasRepeticion ? tarea.diasRepeticion.join(', ')
                    : 'No aplica'}</p>
                                        <p>Estado: ${tarea.estado}</p>
                                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button type="button" class="btn btn-danger">ELIMINAR</button>

                                            <button type="button" class="btn btn-success">MODIFICAR</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>








<!--
            
                <div class="card">
                <div class="card-header">
                <h5 class="card-title">${tarea.nombre}</h5>
                </div>
                <div class="card-body">
                <p class="card-text">${tarea.detalle}</p>
                <p>Tipo: ${tarea.tipo}</p>
                <p>Hora: ${tarea.hora}</p>
                <p>Días de repetición: ${tarea.diasRepeticion ? tarea.diasRepeticion.join(', ') : 'No aplica'}</p>
                <p>Estado: ${tarea.estado}</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-danger">ELIMINAR</button>
 
                <button type="button" class="btn btn-success">MODIFICAR</button>
                </div>

                </div>
                </div>


<!--    

                <h3>${tarea.nombre}</h3>
                <p>${tarea.detalle}</p>
                <p>Tipo: ${tarea.tipo}</p>
                <p>Hora: ${tarea.hora}</p>
                <p>Días de repetición: ${tarea.diasRepeticion ? tarea.diasRepeticion.join(', ') : 'No aplica'}</p>
                <p>Estado: ${tarea.estado}</p>
                <button onclick="cambiarEstadoTarea(${index})">Cambiar estado</button>
                <button onclick="eliminarTarea(${index})">Eliminar tarea</button>   -->



            `;

            contenedorTareas.appendChild(tareaDiv);
        });
    }

    // Ejemplo de funciones para cambiar el estado y eliminar tareas
    function cambiarEstadoTarea(index) {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        if (usuarioActual) {
            usuarioActual.tareas[index].estado = usuarioActual.tareas[index].estado === 'pendiente' ? 'completada' : 'pendiente';
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
            mostrarTareas(); // Actualiza la vista
        }
    }

    function eliminarTarea(index) {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        if (usuarioActual) {
            usuarioActual.tareas.splice(index, 1);
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
            mostrarTareas(); // Actualiza la vista
        }
    }

    // Llama a la función mostrarTareas al cargar la página o al cambiar el filtro
    document.addEventListener('DOMContentLoaded', () => {
        mostrarTareas();
    });

    // Agregar eventos a los botones para mostrar tareas según el filtro
    filtroTareasDia.addEventListener('click', () => mostrarTareas('dia'));
    filtroTareasSemana.addEventListener('click', () => mostrarTareas('semana'));
    filtroTareasMes.addEventListener('click', () => mostrarTareas('mes'));
    filtroTareas.addEventListener('click', () => mostrarTareas('todo'));

    // Mostrar todas las tareas al cargar la página
    mostrarTareas('todo');
});
