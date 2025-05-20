<?php

    include 'conexion.php';

    $nombre_juego = $_POST['nombre_juego'];
    $nivel = $_POST['nivel'];
    $categoria = $_POST['categoria'];

    $sql = "SELECT * FROM resultado_juegos WHERE nombre_juego = '$nombre_juego' AND nivel = '$nivel' AND categoria = '$categoria' ORDER BY puntaje DESC, tiempo ASC LIMIT 5";

    $resultado = $conexion->query($sql);

    $resultado_array = array();
    while($fila = $resultado->fetch_assoc()){
        $resultado_array[] = $fila;
    }

    echo json_encode($resultado_array);
?>