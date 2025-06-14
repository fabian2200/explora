<?php

include 'conexion.php';


$nombre_juego = $_POST['nombre_juego_query'];
$nombre_jugador = $_POST['nombre_jugador_query'];
$grado_jugador = $_POST['grado_jugador_query'];
$avatar_jugador = $_POST['avatar_jugador_query'];
$preguntas_correctas = $_POST['preguntas_correctas_query'];
$tiempo = $_POST['tiempo_query'];
$nivel = $_POST['nivel_query'];
$categoria = $_POST['categoria_query'];
$id_usuario_logueado = $_POST['id_usuario_logueado'];

$fecha_actual = date('d-m-Y H:i:s');

$sql = "INSERT INTO resultado_juegos (nombre_juego, jugador, grado, avatar, puntaje, tiempo, nivel, categoria, id_usuario, fecha) VALUES ('$nombre_juego', '$nombre_jugador', '$grado_jugador', '$avatar_jugador', '$preguntas_correctas', '$tiempo', '$nivel', '$categoria', '$id_usuario_logueado', '$fecha_actual')";

$resultado = $conexion->query($sql);

if($resultado){
    echo json_encode(array('status' => 'success', 'mensaje' => 'Resultado guardado correctamente'));
}else{
    echo json_encode(array('status' => 'error', 'mensaje' => 'Error al guardar el resultado' . $conexion->error));
}

?>