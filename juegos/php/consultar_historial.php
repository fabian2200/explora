<?php

    include 'conexion.php';

    $id_usuario = $_GET['id_usuario'];

    $sql = "SELECT * FROM resultado_juegos WHERE id_usuario = $id_usuario";
    $resultado = $conexion->query($sql);


    $datos = $resultado->fetch_all(MYSQLI_ASSOC);

    // Ordenar por 'fecha_juego' de más reciente a más antigua
    usort($datos, function ($a, $b) {
        return strtotime($b['fecha']) - strtotime($a['fecha']);
    });

    $historial = array();
    foreach($datos as $row){
        $historial[] = $row;
    }


    echo json_encode($historial);   
?>  