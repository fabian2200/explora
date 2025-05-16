function seleccionarTipoMapa(tipo) {
    console.log(tipo);
    if (tipo == 'general') {
        window.location.href = 'index.html';
    } else if (tipo == 'hidrico') {
        window.location.href = 'vertientes.html';
    } else if (tipo == 'coordilleras') {
        window.location.href = 'coordilleras.html';
    } else if (tipo == 'climatico') {
        window.location.href = 'climatico.html';
    } else if (tipo == 'parques_naturales') {
        window.location.href = 'parques_naturales.html';
    } else if (tipo == 'volcanes') {
        window.location.href = 'volcanes.html';
    } else if (tipo == 'etnias') {
        window.location.href = 'etnias.html';
    }
}
