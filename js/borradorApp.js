//login.js
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


//registro.js


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




//cerrarSesion.js



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






//FormularioDeTareas.js




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
            id: Date.now().toString(),
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




//listadoDeTareas



document.addEventListener('DOMContentLoaded', function () {
    const listaTareas = document.getElementById('listaTareas');

    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActual) {
        console.error('No hay usuario actual en localStorage');
        return;
    }

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


//agenda.html




<div id="verAgenda" class="col-md-6">

    <div class="mb-4">

        <h3>Ver Agenda</h3>

        <button type="button" class="btn btn-primary" id="filtroTareasDia">
            Hoy <span class="badge text-bg-secondary">4</span>
        </button>
        <button type="button" class="btn btn-primary" id="filtroTareasSemana">
            Semana <span class="badge text-bg-secondary">4</span>
        </button>
        <button type="button" class="btn btn-primary" id="filtroTareasMes">
            Mes <span class="badge text-bg-secondary">4</span>
        </button>
        <button type="button" class="btn btn-primary" id="filtroTareas">
            Todo <span class="badge text-bg-secondary">4</span>
        </button>

        <input type="text" id="buscarTarea" class="form-control" placeholder="Buscar tarea...">

            <!--TEMPLATE VER TAREA-->

            <template id="verTareas">
                <div id="tareas"></div>
            </template>
    </div>
</div>
