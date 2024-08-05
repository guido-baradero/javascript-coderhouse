document.addEventListener('DOMContentLoaded', function () {
    // Botones y contenedor de formularios
    const btnDia = document.getElementById('btnDia');
    const btnSemana = document.getElementById('btnSemana');
    const btnMes = document.getElementById('btnMes');
    const contenedorFormularios = document.getElementById('contenedorFormularios');

    // Templates
    const formularioGeneralTemplate = document.getElementById('formularioGeneralTemplate');
    const formularioSemanaTemplate = document.getElementById('formularioSemanaTemplate');
    const formularioMesTemplate = document.getElementById('formularioMesTemplate');

    // Contador
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

    // Ejecutar la función cuando la página se carga
    mostrarTareasUsuarioActual();



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

    // Agregar eventos a los botones
    btnDia.addEventListener('click', () => mostrarFormulario('dia'));
    btnSemana.addEventListener('click', () => mostrarFormulario('semana'));
    btnMes.addEventListener('click', () => mostrarFormulario('mes'));

    // funcion para cancelar la tarea



    // Función para agregar una tarea
    function agregarTarea(event) {
        event.preventDefault();

        const nombreTarea = document.getElementById('nombreTarea').value;
        const detalleTarea = document.getElementById('detalleTarea').value;
        const horaTarea = document.getElementById('horaTarea').value;

        let tipoTarea;
        if (document.getElementById('diasSemana')) {
            tipoTarea = 'semana';
        } else if (document.getElementById('diaMes')) {
            tipoTarea = 'mes';
        } else {
            tipoTarea = 'dia';
        }

        const nuevaTarea = {
            id: generarContador().toString(),
            nombre: nombreTarea,
            detalle: detalleTarea,
            hora: horaTarea,
            tipo: tipoTarea
        };

        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

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

    const btnAgregarTarea = document.getElementById('btnAgregarTarea');
    if (btnAgregarTarea) {
        btnAgregarTarea.addEventListener('click', agregarTarea);
    }
});