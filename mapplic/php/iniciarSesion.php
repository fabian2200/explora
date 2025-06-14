<?php

include "conexion_pedigital.php";

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

$sql = "SELECT * FROM users WHERE login_usuario = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();

    // Verifica la contraseña usando password_verify
    if (password_verify($contrasena, $fila['pasword_usuario'])) {
        echo json_encode([
            'success' => true,
            'mensaje' => 'Inicio de sesión exitoso',
            'usuario_objeto' => $fila
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'mensaje' => 'Contraseña incorrecta'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'mensaje' => 'Usuario no encontrado'
    ]);
}
?>