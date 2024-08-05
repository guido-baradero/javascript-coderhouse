document.addEventListener('DOMContentLoaded', function () {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioActual = usuarios.find(u => u.estado === true);

    if (!usuarioActual || usuarioActual.estado !== true) {
        window.location.href = '../index.html';
    } else {
        // Obtener los botones y el contenedor de formularios
        const btnDia = document.getElementById('btnDia');
        const btnSemana = document.getElementById('btnSemana');
        const btnMes = document.getElementById('btnMes');
        const contenedorFormularios = document.getElementById('contenedorFormularios');

        // Obtener los templates
        const formularioGeneralTemplate = document.getElementById('formularioGeneralTemplate');
        const formularioSemanaTemplate = document.getElementById('formularioSemanaTemplate');
        const formularioMesTemplate = document.getElementById('formularioMesTemplate');

        // Función para mostrar un formulario
        function mostrarFormulario(tipo) {
            // Limpiar el contenedor de formularios
            contenedorFormularios.innerHTML = '';

            // Clonar y agregar el formulario general
            const formularioGeneralClone = formularioGeneralTemplate.content.cloneNode(true);
            contenedorFormularios.appendChild(formularioGeneralClone);

            // Agregar formularios específicos según el tipo
            if (tipo === 'semana') {
                const formularioSemanaClone = formularioSemanaTemplate.content.cloneNode(true);
                contenedorFormularios.appendChild(formularioSemanaClone);
            } else if (tipo === 'mes') {
                const formularioMesClone = formularioMesTemplate.content.cloneNode(true);
                contenedorFormularios.appendChild(formularioMesClone);
            } else if (tipo === 'dia') {

            }

            // Mostrar el formulario
            const formularios = contenedorFormularios.querySelectorAll('.formulario');
            formularios.forEach(formulario => formulario.style.display = 'block');
        }

        // Agregar eventos a los botones
        btnDia.addEventListener('click', () => mostrarFormulario('dia'));
        btnSemana.addEventListener('click', () => mostrarFormulario('semana'));
        btnMes.addEventListener('click', () => mostrarFormulario('mes'));

        // Crea la nueva tarea basada en el tipo seleccionado
        const nuevaTarea = {
            id: i++,//quiero un id en un contador numerico acendente
            titulo: 'sin titulo',
            detalle: 'vacio',
            tipo: '',
            estado: 'pendiente', // Inicialmente todas las tareas son pendientes
            fechaCreacion: new Date().toISOString()
        };

        // Agregar la nueva tarea al array de tareas del usuario actual
        usuarioActual.tareas.push(nuevaTarea);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

        // Limpiar y ocultar el formulario
        document.getElementById('formTarea').reset();
        // formularioTarea.style.display = 'none';
    };

    btnAgregarTarea.addEventListener('click', (e) => {
        e.preventDefault();
        const nombreTarea = document.getElementById('nombreTarea').value;
        const detalleTarea = document.getElementById('detalleTarea').value;
        const tipoTarea = document.getElementById('tipoTarea').value;
        const horaTarea = document.getElementById('horaTarea').value;
        const diasRepeticion = tipoTarea === 'semana' ? Array.from(diasRepeticionSemana.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value) : tipoTarea === 'mes' ? [document.getElementById('diaMes').value] : [];

        if (!nombreTarea || !detalleTarea || !tipoTarea || !horaTarea || (tipoTarea !== 'dia' && diasRepeticion.length === 0)) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));

        const nuevaTarea = {
            nombre: nombreTarea,
            detalle: detalleTarea,
            tipo: tipoTarea,
            hora: horaTarea,
            diasRepeticion: diasRepeticion,
            estado: 'pendiente'
        };

        usuarioActual.tareas.push(nuevaTarea);
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

        const usuarioIndex = usuarios.findIndex(user => user.nombre === usuarioActual.nombre);
        usuarios[usuarioIndex] = usuarioActual;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        mostrarTareas();
        alert('Tarea agregada con éxito.');
        formTarea.reset();

        console.log(localStorage.setItem('usuarios', JSON.stringify(usuarios)));
    })
});
