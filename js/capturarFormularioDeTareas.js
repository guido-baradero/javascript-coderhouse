// Función para capturar y guardar la tarea
function capturarTarea(event) {
    event.preventDefault();

    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));

    if (!usuarioActual) {
        alert('Debe iniciar sesión para agregar tareas');
        console.error('No hay usuario actual en localStorage');
        return;
    }

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const tipo = document.getElementById('tipo').value;

    let nuevaTarea = {
        id: Date.now(),
        titulo: titulo,
        descripcion: descripcion,
        fecha: fecha,
        hora: hora,
        tipo: tipo
    };

    // Agregar la tarea al usuario actual
    const usuarioEncontrado = usuarios.find(u => u.id === usuarioActual.id);
    if (usuarioEncontrado) {
        usuarioEncontrado.tareas.push(nuevaTarea);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
        console.log(`Tarea agregada al usuario ${usuarioActual.usuario}`);
        alert('Tarea guardada exitosamente');
    } else {
        console.error('Usuario actual no encontrado en la lista de usuarios');
    }

    // Limpiar el formulario después de guardar la tarea
    const formularioGeneral = document.getElementById('formularioGeneral');
    if (formularioGeneral) formularioGeneral.reset();

    const formularioSemana = document.getElementById('formularioSemana');
    if (formularioSemana) formularioSemana.reset();

    const formularioMes = document.getElementById('formularioMes');
    if (formularioMes) formularioMes.reset();
}

// Agregar el evento de envío al formulario
document.getElementById('contenedorFormularios').addEventListener('submit', capturarTarea);
