function seleccionarTipoMapa(tipo) {
    console.log(tipo);
    if (tipo == 'general') {
        window.location.href = 'departamentos.html';
    } else if (tipo == 'hidrico') {
        window.location.href = 'vertientes.html';
    } else if (tipo == 'coordilleras') {
        window.location.href = 'coordilleras.html';
    } else if (tipo == 'climatico') {
        window.location.href = 'climatico.html';
    }
}
