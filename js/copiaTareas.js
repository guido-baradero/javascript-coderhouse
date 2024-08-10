// En tareas.js
function eliminarTarea(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

        if (usuarioActual && usuarioActual.tareas) {
            usuarioActual.tareas = usuarioActual.tareas.filter(tarea => tarea.id !== id);
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

            // Actualizar la lista de usuarios en localStorage
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuarios = usuarios.map(u => u.usuario === usuarioActual.usuario ? usuarioActual : u);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Volver a mostrar las tareas
            mostrarTareas('todo');
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Botones y contenedor de formularios
    const btnDia = document.getElementById('btnDia');
    const btnSemana = document.getElementById('btnSemana');
    const btnMes = document.getElementById('btnMes');
    const contenedorFormularios = document.getElementById('contenedorFormularios');
    const btnAgregarTarea = document.getElementById('btnAgregarTarea');
    const listaTareas = document.getElementById('listaTareas');
    const filtroTareasDia = document.getElementById('filtroTareasDia');
    const filtroTareasSemana = document.getElementById('filtroTareasSemana');
    const filtroTareasMes = document.getElementById('filtroTareasMes');
    const filtroTareas = document.getElementById('filtroTareas');
    const tareasContainer = document.getElementById('tareasContainer');
    const contenedorTareas = document.getElementById('tareas');
    const tareaTemplate = document.getElementById('tareaTemplate');

    // Templates
    const formularioGeneralTemplate = document.getElementById('formularioGeneralTemplate');
    const formularioSemanaTemplate = document.getElementById('formularioSemanaTemplate');
    const formularioMesTemplate = document.getElementById('formularioMesTemplate');

    // Función para generar contador
    function generarContador(tipoUsuario) {
        const contadorUsuarios = {
            'soloLectura': '001',
            'agenda': '010',
            'administrador': '100',
            'grupos': '111'
        };

        let contador = JSON.parse(localStorage.getItem('contador')) || {};
        contador[tipoUsuario] = (contador[tipoUsuario] || 0) + 1;

        localStorage.setItem('contador', JSON.stringify(contador));

        const numeroUsuario = contadorUsuarios[tipoUsuario];
        const numeroTarea = String(contador[tipoUsuario]).padStart(4, '0');

        return `${numeroUsuario}-${numeroTarea}`;
    }

    // Función para mostrar las tareas del usuario actual
    function mostrarTareasUsuarioActual() {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

        if (usuarioActual && usuarioActual.tareas) {
            console.log(`Tareas del usuario: ${usuarioActual.usuario}`);
            console.table(usuarioActual.tareas);
        } else {
            console.log('No hay un usuario actual o el usuario no tiene tareas.');
        }
    }

    // Función para mostrar un formulario
    function mostrarFormulario(tipo) {
        contenedorFormularios.innerHTML = '';

        const formularioGeneralClone = formularioGeneralTemplate.content.cloneNode(true);
        contenedorFormularios.appendChild(formularioGeneralClone);

        if (tipo === 'semana') {
            const formularioSemanaClone = formularioSemanaTemplate.content.cloneNode(true);
            contenedorFormularios.appendChild(formularioSemanaClone);
        } else if (tipo === 'mes') {
            const formularioMesClone = formularioMesTemplate.content.cloneNode(true);
            contenedorFormularios.appendChild(formularioMesClone);
        }

        const formularios = contenedorFormularios.querySelectorAll('.formulario');
        formularios.forEach(formulario => formulario.style.display = 'block');
    }

    // Función para capturar los días de repetición
    function obtenerDiasRepeticion() {
        const diasSemana = document.querySelectorAll('#diasSemana .form-check-input:checked');
        const diaMes = document.getElementById('diaMes');

        let diasRepeticion = [];

        if (diasSemana.length > 0) {
            diasSemana.forEach(dia => {
                diasRepeticion.push(dia.value);
            });
        } else if (diaMes && diaMes.value) {
            diasRepeticion.push(diaMes.value);
        }

        return diasRepeticion;
    }

    // Función para agregar una tarea
    function agregarTarea(event) {
        event.preventDefault();

        const nombreTarea = document.getElementById('nombreTarea').value;
        const detalleTarea = document.getElementById('detalleTarea').value;
        const horaTarea = document.getElementById('horaTarea').value;
        const diasRepeticion = obtenerDiasRepeticion();

        let tipoTarea;
        if (document.getElementById('diasSemana')) {
            tipoTarea = 'semana';
        } else if (document.getElementById('diaMes')) {
            tipoTarea = 'mes';
        } else {
            tipoTarea = 'dia';
        }

        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        const nuevaTarea = {
            id: generarContador(usuarioActual.alcance.toLowerCase()).toString(),
            nombre: nombreTarea,
            detalle: detalleTarea,
            hora: horaTarea,
            tipo: tipoTarea,
            diasRepeticion: diasRepeticion,
            estado: 'pendiente'
        };

        if (usuarioActual) {
            usuarioActual.tareas.push(nuevaTarea);
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuarios = usuarios.map(u => u.usuario === usuarioActual.usuario ? usuarioActual : u);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            console.log('Tarea agregada:', nuevaTarea);
            console.table(usuarioActual.tareas);

            const formularioGeneral = document.querySelector('form');
            if (formularioGeneral) {
                formularioGeneral.reset();
            }
            const formularioSemana = document.getElementById('formularioSemana');
            if (formularioSemana) {
                formularioSemana.reset();
            }
            const formularioMes = document.getElementById('formularioMes');
            if (formularioMes) {
                formularioMes.reset();
            }
        }
    }

    // Función para mostrar tareas

    function mostrarTareas(filtro) {
        contenedorTareas.innerHTML = ''; // Limpiar el contenedor

        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

        if (!usuarioActual || !usuarioActual.tareas) {
            contenedorTareas.innerHTML = '<p>No hay tareas disponibles</p>';
            return;
        }

        const tareasFiltradas = usuarioActual.tareas.filter(tarea => {
            if (filtro === 'dia') {
                return tarea.tipo === 'dia';
            } else if (filtro === 'semana') {
                return tarea.tipo === 'semana';
            } else if (filtro === 'mes') {
                return tarea.tipo === 'mes';
            } else {
                return true; // Mostrar todas las tareas
            }
        });

        if (filtro === 'mes') {
            for (let i = 1; i <= 31; i++) {
                const diaDiv = document.createElement('div');
                diaDiv.classList.add('dia');
                diaDiv.innerHTML = `<h4>${i}</h4>`;
                const tareasDelDia = tareasFiltradas.filter(tarea => Array.isArray(tarea.diasRepeticion) && tarea.diasRepeticion.includes(i.toString()));
                tareasDelDia.forEach(tarea => {
                    const tareaDiv = document.createElement('div');
                    tareaDiv.classList.add('tarea');
                    tareaDiv.innerHTML = `
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse${tarea.id}" aria-expanded="true" aria-controls="collapse${tarea.id}">
                                    <h5 class="card-title">${tarea.nombre}</h5>
                                </button>
                            </h2>
                            <div id="collapse${tarea.id}" class="accordion-collapse collapse"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <p class="card-text">${tarea.detalle}</p>
                                    <p>Tipo: ${tarea.tipo}</p>
                                    <p>Hora: ${tarea.hora}</p>
                                    <p>Días de repetición: ${Array.isArray(tarea.diasRepeticion) ? tarea.diasRepeticion.join(', ') : ''}</p>
                                    <p>Estado: ${tarea.estado}</p>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" class="btn btn-danger" onclick="eliminarTarea('${tarea.id}')">ELIMINAR</button>
                                        <button type="button" class="btn btn-success">MODIFICAR</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                    diaDiv.appendChild(tareaDiv);
                });
                contenedorTareas.appendChild(diaDiv);
            }
        } else {
            tareasFiltradas.forEach((tarea, index) => {
                const tareaClone = tareaTemplate.content.cloneNode(true);

                tareaClone.querySelector('.card-title').textContent = tarea.nombre;
                tareaClone.querySelector('.card-text').textContent = tarea.detalle;
                tareaClone.querySelector('p:nth-of-type(2)').textContent = `Tipo: ${tarea.tipo}`;
                tareaClone.querySelector('p:nth-of-type(3)').textContent = `Hora: ${tarea.hora}`;
                tareaClone.querySelector('p:nth-of-type(4)').textContent = `Días de repetición: ${tarea.diasRepeticion ? tarea.diasRepeticion.join(', ') : 'No aplica'}`;
                tareaClone.querySelector('p:nth-of-type(5)').textContent = `Estado: ${tarea.estado}`;
                tareaClone.querySelector('.btn-danger').setAttribute('onclick', `eliminarTarea('${tarea.id}')`);
                tareaClone.querySelector('.btn-success').setAttribute('onclick', `cambiarEstadoTarea('${tarea.id}')`);

                contenedorTareas.appendChild(tareaClone);
            });
        }
    }

    // Agregar eventos a los botones
    btnDia.addEventListener('click', () => mostrarFormulario('dia'));
    btnSemana.addEventListener('click', () => mostrarFormulario('semana'));
    btnMes.addEventListener('click', () => mostrarFormulario('mes'));
    if (btnAgregarTarea) {
        btnAgregarTarea.addEventListener('click', agregarTarea);
    }
    filtroTareasDia.addEventListener('click', () => mostrarTareas('dia'));
    filtroTareasSemana.addEventListener('click', () => mostrarTareas('semana'));
    filtroTareasMes.addEventListener('click', () => mostrarTareas('mes'));
    filtroTareas.addEventListener('click', () => mostrarTareas('todo'));

    // Mostrar todas las tareas al cargar la página
    mostrarTareas('todo');
    mostrarTareasUsuarioActual();
});