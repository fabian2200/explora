<?php
include 'conexion.php';
$id_departamento = $_GET["id"];

$sql = "SELECT * FROM departamento_descripcion WHERE departamento = $id_departamento";
$resultado = $conexion->query($sql);

$departamento = [];

if ($resultado->num_rows > 0) {
    $row_original = $resultado->fetch_assoc();
    $departamento["descripcion"] = $row_original;

    $sql = "SELECT * FROM list_departamentos WHERE id = $id_departamento";
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["nombreDepartamento"] = $row;

    $sql = "SELECT * FROM departamento_historia WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["historia"] = $row;

    $sql = "SELECT * FROM departamento_geografia WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["geografia"] = $row;

    $sql = "SELECT * FROM departamento_hidrografia WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["hidrografia"] = $row;

    $sql = "SELECT * FROM departamento_clima WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["clima"] = $row;

    $sql = "SELECT * FROM departamento_demografia WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["demografia"] = $row;

    $sql = "SELECT * FROM departamento_etnografia WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["etnografia"] = $row;
    $sql = "SELECT * FROM departamento_etnografia_list WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    if ($resultado->num_rows > 0) {
        $lista_etnografia = array();
        while ($row = $resultado->fetch_assoc()) {
            $lista_etnografia[] = $row;
        }
        $departamento["etnografia"]["lista"] = $lista_etnografia;
    } else {
        $departamento["etnografia"]["lista"] = array();
    }

    $sql = "SELECT * FROM departamento_fauna_flora WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["faunaFlora"] = $row;

    $sql = "SELECT * FROM departamento_flora_list WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    if ($resultado->num_rows > 0) {
        $lista_flora = array();
        while ($row = $resultado->fetch_assoc()) {
            $lista_flora[] = $row;
        }
        $departamento["faunaFlora"]["lista_flora"] = $lista_flora;
    } else {
        $departamento["faunaFlora"]["lista_flora"] = array();
    }

    $sql = "SELECT * FROM departamento_fauna_list WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    if ($resultado->num_rows > 0) {
        $lista_flora = array();
        while ($row = $resultado->fetch_assoc()) {
            $lista_flora[] = $row;
        }
        $departamento["faunaFlora"]["lista_fauna"] = $lista_flora;
    } else {
        $departamento["faunaFlora"]["lista_fauna"] = array();
    }
    
    $sql = "SELECT * FROM departamento_economia WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["economia"] = $row;

    $sql = "SELECT * FROM departamento_cultura WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["cultura"] = $row;

    $sql = "SELECT * FROM departamento_gastronomia WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["gastronomia"] = $row;

    $sql = "SELECT * FROM departamento_festividad_list WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    if ($resultado->num_rows > 0) {
        $lista = array();
        while ($row = $resultado->fetch_assoc()) {
            $lista[] = $row;
        }
        $departamento["festividades"] = $lista;
    } else {
        $departamento["festividades"] = array();
    }

    $sql = "SELECT * FROM departamento_sitios_list WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    if ($resultado->num_rows > 0) {
        $lista = array();
        while ($row = $resultado->fetch_assoc()) {
            $lista[] = $row;
        }
        $departamento["sitios"] = $lista;
    } else {
        $departamento["sitios"] = array();
    }

    $sql = "SELECT * FROM departamento_personaje_list WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    if ($resultado->num_rows > 0) {
        $lista = array();
        while ($row = $resultado->fetch_assoc()) {
            $lista[] = $row;
        }
        $departamento["personajes"] = $lista;
    } else {
        $departamento["personajes"] = array();
    }

    $sql = "SELECT * FROM departamento_capital WHERE departamento = " . $row_original['id'];
    $resultado = $conexion->query($sql);
    $row = $resultado->fetch_assoc();
    $departamento["capital"] = $row;

} else {
    $departamento['error'] = "No se encontraron registros para el departamento con ID: $id_departamento";
}

$conexion->close();

echo json_encode($departamento, JSON_UNESCAPED_UNICODE);
?>