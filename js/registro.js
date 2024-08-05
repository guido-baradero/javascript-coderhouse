document.addEventListener('DOMContentLoaded', function () {
    const formRegistro = document.getElementById('formRegistro');
    const nombreUsuario = document.getElementById('nombreUsuario');
    const apellidoUsuario = document.getElementById('apellidoUsuario');
    const registroUsuario = document.getElementById('registroUsuario');
    const contrasenaRegistro = document.getElementById('contrasena');
    const confirmarContrasena = document.getElementById('confirmarContrasena');
    const alcance = document.getElementById('alcance');
    const gridCheck = document.getElementById('gridCheck');

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    formRegistro.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!gridCheck.checked) {
            alert('Debe confirmar que no es un robot');
            return;
        }

        if (contrasenaRegistro.value !== confirmarContrasena.value) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const nuevoUsuario = {
            id: Date.now().toString(),
            nombre: nombreUsuario.value,
            apellido: apellidoUsuario.value,
            usuario: registroUsuario.value,
            contrasena: contrasenaRegistro.value,
            alcance: alcance.value,
            tareas: [],
            estado: false
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuario registrado exitosamente. Por favor, inicie sesión.');

        window.location.href = '../index.html';
    });
});

