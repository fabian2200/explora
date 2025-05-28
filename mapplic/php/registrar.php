<?php

    include "conexion.php";

    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];
    $grado = $_POST['grado'];
    $nombre = $_POST['nombre'];
    $avatar = $_POST['avatar'];

    $contrasena = md5($contrasena);

    $sql = "SELECT * FROM usuarios_explora WHERE usuario = '$usuario'";
    $resultado = mysqli_query($conexion, $sql);

    if (mysqli_num_rows($resultado) > 0) {
        echo json_encode(['success' => false, 'mensaje' => 'Ya existe un estudiante con este usuario.']);
    }else{
        $sql = "INSERT INTO usuarios_explora (usuario, contrasena, grado, nombre, avatar) VALUES ('$usuario', '$contrasena', '$grado', '$nombre', '$avatar')";
        $sql = "INSERT INTO usuarios_explora (usuario, contrasena, grado, nombre, avatar) VALUES ('$usuario', '$contrasena', '$grado', '$nombre', '$avatar')";
        $resultado = mysqli_query($conexion, $sql);

        if ($resultado) {
            echo json_encode(['success' => true, 'mensaje' => 'Usuario registrado correctamente']);
        } else {
            $error = mysqli_error($conexion);
            echo json_encode(['success' => false, 'mensaje' => 'Error al registrar el usuario: ' . $error]);
        }
    }
?>