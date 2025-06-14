<?php
// Datos de conexión a la base de datos
$host = "localhost"; // Puede ser diferente si tu base de datos está en otro servidor
$usuario = "root"; // Usuario de la base de datos
$password = "root"; // Contraseña del usuario
$base_datos = "pedigital"; // Nombre de la base de datos a la que te conectarás

// Crear conexión usando MySQLi
$conexion = new mysqli($host, $usuario, $password, $base_datos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Establecer el juego de caracteres a UTF-8 (opcional)
$conexion->set_charset("utf8");

?>
