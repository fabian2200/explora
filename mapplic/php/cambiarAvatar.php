<?php
    include 'conexion_pedigital.php';

    $id_usuario = $_POST['id_usuario'];
    $avatar = $_POST['avatar']; 

    $sql = "UPDATE users SET avatar_explora = '$avatar' WHERE id = $id_usuario";

    $resultado = $conexion->query($sql);

    if($resultado){
        echo json_encode(array('status' => 'success', 'message' => 'Avatar cambiado correctamente'));
    }else{
        echo json_encode(array('status' => 'error', 'message' => 'Error al cambiar el avatar, error: ' . $conexion->error));
    }
?>