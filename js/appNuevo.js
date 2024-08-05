document.addEventListener('DOMContentLoaded', function () {
    const btnDia = document.getElementById('btnDia');
    const btnSemana = document.getElementById('btnSemana');
    const btnMes = document.getElementById('btnMes');
    const contenedorFormularios = document.getElementById('contenedorFormularios');
    const formularioGeneralTemplate = document.getElementById('formularioGeneralTemplate');
    const formularioSemanaTemplate = document.getElementById('formularioSemanaTemplate');
    const formularioMesTemplate = document.getElementById('formularioMesTemplate');

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

    function mostrarTareasUsuarioActual() {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

        if (usuarioActual && usuarioActual.tareas) {
            console.log(`Tareas del usuario: ${usuarioActual.usuario}`);
            console.table(usuarioActual.tareas);
        } else {
            console.log('No hay un usuario actual o el usuario no tiene tareas.');
        }
    }

    mostrarTareasUsuarioActual();

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

    btnDia.addEventListener('click', () => mostrarFormulario('dia'));
    btnSemana.addEventListener('click', () => mostrarFormulario('semana'));
    btnMes.addEventListener('click', () => mostrarFormulario('mes'));

    function agregarTarea(event) {
        event.preventDefault();

        const nombreTarea = document.getElementById('nombreTarea').value;
        const detalleTarea = document.getElementById('detalleTarea').value;
        const horaTarea = document.getElementById('horaTarea').value;

        let tipoTarea;
        if (document.getElementById('diasSemana')) {
            tipoTarea = 'semana';
        } else if (document.getElementById('numeroMes')) {
            tipoTarea = 'mes';
        } else {
            tipoTarea = 'dia';
        }

        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        const nuevoID = generarContador(usuarioActual.alcance);

        const nuevaTarea = {
            id: nuevoID,
            nombre: nombreTarea,
            detalle: detalleTarea,
            hora: horaTarea,
            tipo: tipoTarea,
            estado: 'pendiente'
        };

        usuarioActual.tareas.push(nuevaTarea);
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

        alert('Tarea agregada exitosamente');
        mostrarTareasUsuarioActual();
    }

    contenedorFormularios.addEventListener('submit', agregarTarea);
});
