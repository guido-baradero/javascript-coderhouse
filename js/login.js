document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('formLogin');
    const loginUsuario = document.getElementById('loginUsuario');
    const loginContrasena = document.getElementById('loginContrasena');
    const probarSinRegistrarme = document.querySelector('a[href="#"]');

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(u => u !== null);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));



    console.table(usuarios);



    // Recuperar y mostrar todos los usuarios
    //let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.table(usuarios);

    // Recuperar y mostrar el usuario actual
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    console.log("Usuario actual:");
    console.table(usuarioActual);

    // Mostrar las tareas del usuario actual si existen
    if (usuarioActual && usuarioActual.tareas) {
        console.log("Tareas del usuario actual:");
        console.table(usuarioActual.tareas);
    }




    formLogin.addEventListener('submit', function (event) {
        event.preventDefault();
        const usuario = loginUsuario.value;
        const contrasena = loginContrasena.value;

        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

        if (usuarioEncontrado) {
            usuarios.forEach(u => u.estado = false);
            usuarioEncontrado.estado = true;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
            alert('Inicio de sesión exitoso');
            window.location.href = '../pages/agenda.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    probarSinRegistrarme.addEventListener('click', function (event) {
        event.preventDefault();

        let usuarioInvitado = usuarios.find(u => u.usuario === 'invitado');

        if (!usuarioInvitado) {
            usuarioInvitado = {
                id: 'invitado',
                nombre: 'invitado',
                apellido: '',
                usuario: 'invitado',
                contrasena: '',
                alcance: 'invitado',
                tareas: [],
                estado: true
            };
            usuarios.push(usuarioInvitado);
        } else {
            usuarioInvitado.estado = true;
            usuarioInvitado.tareas = [];
        }

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioInvitado));
        window.location.href = '../pages/agenda.html';
    });
});

