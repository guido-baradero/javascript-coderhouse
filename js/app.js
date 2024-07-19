const agenda = {};
let contador = 1;
let usuarioActual = '';

const diasSemana = { 1: 'lunes', 2: 'martes', 3: 'miercoles', 4: 'jueves', 5: 'viernes', 6: 'sabado', 7: 'domingo' };

function iniciarSesion() {
    let nombreUsuario;
    do {
        nombreUsuario = prompt('Ingrese su nombre').trim();
        if (!nombreUsuario) {
            alert('El nombre de usuario no puede estar vacio');
        }
    } while (!nombreUsuario);

    usuarioActual = nombreUsuario;
    if (!agenda[usuarioActual]) {
        agenda[usuarioActual] = [];
        console.log(`Agenda de ${usuarioActual}`);
        alert(`Bienvenido ${usuarioActual}`);
    } else {
        alert(`Hola ${usuarioActual} vas a revisar tus notas...`);
    }
}

function generarId(tipoTareaNum) {
    return `${tipoTareaNum}-${contador}`;
}

function validarEntrada(valor, min, max) {
    const numero = parseInt(valor);
    return !isNaN(numero) && numero >= min && numero <= max;
}

function agregarTarea() {
    const tipoTareaNum = prompt(`Agenda de ${usuarioActual}\n\nElija la opcion\n\n1 - En la semana\n2 - En el calendario\n3 - En el día...`);
    if (!validarEntrada(tipoTareaNum, 1, 3)) {
        alert('Ingreso invalido');
        return;
    }

    let tarea = { id: '', tipo: '', dia: '', titulo: '', estado: 'Pendiente' };

    if (tipoTareaNum === '1') {
        tarea.tipo = 'Semanal';
        const diasNumeros = prompt('Marque los días separados por comas (1,3,5)\n1 - Lunes\n2 - Martes\n3 - Miércoles\n4 - Jueves\n5 - Viernes\n6 - Sábado\n7 - Domingo');
        const diasNombres = diasNumeros.split(',').map(num => {
            const dia = parseInt(num.trim());
            if (!validarEntrada(dia, 1, 7)) {
                alert('Ingreso invalido');
                return null;
            }
            return diasSemana[dia];
        }).filter(dia => dia !== null);
        if (diasNombres.length === 0) {
            alert('Ingreso invalido');
            return;
        }
        tarea.dia = diasNombres.join(', ');
    } else if (tipoTareaNum === '2') {
        tarea.tipo = 'Mensual';
        const diaMes = prompt('ESCRIBIR\nIngrese el número de día del mes (del 1 al 31)');
        if (!validarEntrada(diaMes, 1, 31)) {
            alert('Ingreso invalido');
            return;
        }
        tarea.dia = diaMes;
    } else if (tipoTareaNum === '3') {
        tarea.tipo = 'hoy';
        tarea.dia = 'hoy';
    }

    tarea.id = generarId(tipoTareaNum);
    contador++;
    tarea.titulo = prompt('AGREGAR\n\nIngrese el título de su tarea');
    if (!tarea.titulo.trim()) {
        alert('El título no puede estar vacío');
        return;
    }
    agenda[usuarioActual].push(tarea);
    console.log(`Se agrego ${tarea.titulo} para ${tarea.dia} en la agenda de ${usuarioActual}`);
}

function mostrarTareas(tipo) {
    const tareasFiltradas = agenda[usuarioActual].filter(tarea => tarea.tipo === tipo);
    if (tareasFiltradas.length === 0) {
        console.log(`No hay tarea ${tipo}`);
        alert(`No hay tarea ${tipo}`);
    } else {
        console.log(`Agenda de ${usuarioActual}\nTareas ${tipo}`);
        console.table(tareasFiltradas);
    }
}

function mostrarTodasTareas() {
    if (agenda[usuarioActual].length === 0) {
        console.log(`${usuarioActual} no agregaste ninguna tarea`);
        alert('No hay tareas');
    } else {
        console.log(`Agenda de ${usuarioActual} completa`);
        console.table(agenda[usuarioActual]);
    }
}

function verAgenda() {
    const vistaNum = prompt(`Agenda de ${usuarioActual}\n\nVER\n\n1 - Día (hoy)\n2 - Semana\n3 - Mes\n4 - Todo`);
    if (!validarEntrada(vistaNum, 1, 4)) {
        alert('Marque un N° del 1 al 4');
        return;
    }

    if (vistaNum === '1') {
        mostrarTareas('hoy');
    } else if (vistaNum === '2') {
        mostrarTareas('Semanal');
    } else if (vistaNum === '3') {
        mostrarTareas('Mensual');
    } else if (vistaNum === '4') {
        mostrarTodasTareas();
    }
}

function modificarTarea() {
    const tipoTareaNum = prompt(`Agenda de ${usuarioActual}\n\nSu tarea a modificar es:\n\n1 - Semanal\n2 - Mensual\n3 - De hoy`);
    if (!validarEntrada(tipoTareaNum, 1, 3)) {
        alert('Ingreso invalido');
        return;
    }
    const tipo = tipoTareaNum === '1' ? 'Semanal' : tipoTareaNum === '2' ? 'Mensual' : 'hoy';
    const tareasFiltradas = agenda[usuarioActual].filter(tarea => tarea.tipo === tipo);
    if (tareasFiltradas.length === 0) {
        alert(`No hay ninguna tarea ${tipo}`);
        return;
    }

    console.table(tareasFiltradas);
    const id = prompt('MODIFICAR\n\nIngrese el ID');
    const tarea = agenda[usuarioActual].find(t => t.id === id);

    if (!tarea) {
        alert('ID Invalido');
        return;
    }

    const campo = prompt('MODIFICAR\n\n1 - Título\n2 - Días (para tareas semanales o mensuales)\n3 - Estado');
    if (!validarEntrada(campo, 1, 3)) {
        alert('Ingreso invalido');
        return;
    }

    switch (campo) {
        case '1':
            tarea.titulo = prompt('MODIFICAR\n\nIngrese el nuevo título');
            if (!tarea.titulo.trim()) {
                alert('El titulo no puede estar vacio');
            } else {
                alert('Se ha modificado el titulo de su tarea');
            }
            break;
        case '2':
            if (tipo === 'Semanal') {
                const diasNumeros = prompt('MODIFICAR\n\nNuevos dias para su tarea:\n1 - Lunes\n2 - Martes\n3 - Miércoles\n4 - Jueves\n5 - Viernes\n6 - Sábado\n7 - Domingo');
                const diasNombres = diasNumeros.split(',').map(num => {
                    const dia = parseInt(num.trim());
                    if (!validarEntrada(dia, 1, 7)) {
                        alert('Ingreso invalido');
                        return null;
                    }
                    return diasSemana[dia];
                }).filter(dia => dia !== null);
                if (diasNombres.length === 0) {
                    alert('Ingreso invalido');
                    return;
                }
                tarea.dia = diasNombres.join(', ');
            } else {
                const diaMes = prompt('Ingrese el nuevo número de día del mes');
                if (!validarEntrada(diaMes, 1, 31)) {
                    alert('Día del mes no válido');
                    return;
                }
                tarea.dia = diaMes;
            }
            alert('Los dias fueron modificados');
            break;
        case '3':
            alert('Para cumplir la tarea marque la opcion 4 del menu principal');
            break;
        default:
            alert('Opcion no valida');
            break;
    }
}

function eliminarTarea() {
    let tipo = prompt(`Agenda de ${usuarioActual}\n\nEliminar tarea\n\n1 - Del día\n2 - De la semana\n3 - Del mes`);

    if (!validarEntrada(tipo, 1, 3)) {
        alert('Opción no válida');
        return;
    }

    tipo = tipo === '1' ? 'hoy' : tipo === '2' ? 'Semanal' : 'Mensual';
    let tareasFiltradas = agenda[usuarioActual].filter(t => t.tipo === tipo);

    if (tareasFiltradas.length === 0) {
        alert('No hay tareas de este tipo');
        return;
    }

    console.table(tareasFiltradas);
    let id = prompt('ELIMINAR\nIngrese el ID');
    let index = agenda[usuarioActual].findIndex(t => t.id === id);

    if (index !== -1) {
        let confirmacion = prompt('Escriba "eliminar" para confirmar');
        if (confirmacion === 'eliminar') {
            agenda[usuarioActual].splice(index, 1);
            alert('Se borro la tarea');
        } else {
            alert('NO se borro la tarea');
        }
    } else {
        alert('ID no encontrado');
    }
}

function cumplirTarea() {
    const tipoTareaNum = prompt(`Agenda de ${usuarioActual}\n\nCumplir tarea\n\n1 - Semanal\n2 - Mensual\n3 - Hoy`);
    if (!validarEntrada(tipoTareaNum, 1, 3)) {
        alert('Opción no válida');
        return;
    }

    const tipo = tipoTareaNum === '1' ? 'Semanal' : tipoTareaNum === '2' ? 'Mensual' : 'hoy';
    const tareasFiltradas = agenda[usuarioActual].filter(tarea => tarea.tipo === tipo);
    if (tareasFiltradas.length === 0) {
        alert(`No hay tareas de tipo ${tipo}`);
        return;
    }

    console.table(tareasFiltradas);
    const id = prompt(`CUMPLIR\n\nIngrese el ID`);
    const tarea = agenda[usuarioActual].find(t => t.id === id);

    if (tarea) {
        tarea.estado = 'Cumplida';
        alert('Tarea cumplida', tarea);
    } else {
        alert('No se encontro su ID');
    }
}

function cerrarSesion() {
    alert(`Sesión cerrada para el usuario: ${usuarioActual}`);
    console.log(`Sesión cerrada para el usuario: ${usuarioActual}`);
    usuarioActual = '';
}



alert('BIENVENIDO A SU AGENDA ONLINE');
iniciarSesion();
let continuar;

do {
    let accion = prompt(`Esta en la agenda de ${usuarioActual}\n\nIngrese la opción deseada\n1 - Agregar una tarea\n2 - Revisar la agenda\n3 - Modificar una tarea\n4 - Cumplir una tarea\n5 - Eliminar\n6 - Cambiar de Usuario\n7 - Salir`);
    if (!validarEntrada(accion, 1, 7)) {
        alert('Opción no válida');
        continuar = prompt("Mantener la agenda abierta... 'si' o 'no'").toLowerCase();
        continue;
    }
    accion = parseInt(accion);

    switch (accion) {
        case 1:
            agregarTarea();
            break;
        case 2:
            verAgenda();
            break;
        case 3:
            modificarTarea();
            break;
        case 4:
            cumplirTarea();
            break;
        case 5:
            eliminarTarea();
            break;
        case 6:
            cerrarSesion();
            iniciarSesion();
            break;
        case 7:
            continuar = 'no';
            break;
        default:
            console.log('Opción no válida.');
            break;
    }

    if (accion !== 7) {
        do {
            continuar = prompt("Mantener agenda abierta... 'si' o 'no'").toLowerCase();
        } while (continuar !== 'si' && continuar !== 'no');
    }
} while (continuar === "si");

alert(`No olvides tus notas ${usuarioActual}!\nNos vemos pronto!`);
