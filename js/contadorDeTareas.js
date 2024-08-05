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
