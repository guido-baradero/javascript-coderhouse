document.addEventListener('DOMContentLoaded', function () {
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', cerrarSesion);
    }

    function cerrarSesion(event) {
        event.preventDefault();

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

        if (usuarioActual && usuarioActual.usuario === 'invitado') {
            const usuarioInvitado = usuarios.find(u => u.usuario === 'invitado');
            if (usuarioInvitado) {
                usuarioInvitado.estado = false;
                usuarioInvitado.tareas = [];
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
            }
        } else if (usuarioActual) {
            const usuarioConectado = usuarios.find(u => u.usuario === usuarioActual.usuario);
            if (usuarioConectado) {
                usuarioConectado.estado = false;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
            }
        }

        localStorage.removeItem('usuarioActual');
        window.location.href = '../index.html';
    }
});


