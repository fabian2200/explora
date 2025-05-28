<?php

    include "conexion.php";

    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];
    $contrasena = md5($contrasena);

    $sql = "SELECT * FROM usuarios_explora WHERE usuario = '$usuario'";
    $resultado = mysqli_query($conexion, $sql);

    if (mysqli_num_rows($resultado) > 0) {
        $fila = mysqli_fetch_assoc($resultado);

        if ($fila['contrasena'] == $contrasena) {
            echo json_encode(['success' => true, 'mensaje' => 'Inicio de sesión exitoso', 'usuario_objeto' => $fila]);
        } else {
            echo json_encode(['success' => false, 'mensaje' => 'Contraseña incorrecta']);
        }
    } else {
        echo json_encode(['success' => false, 'mensaje' => 'Usuario no encontrado']);
    }

    
    
?>