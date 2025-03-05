<?php
    include 'conexion.php';
    $id_departamento = $_GET["id"];

    $sql = "SELECT * FROM departamento_descripcion WHERE departamento = $id_departamento";
    $resultado = $conexion->query($sql);

    $preguntas = [];

    if ($resultado->num_rows > 0) {
        $row_original = $resultado->fetch_assoc();

        $sql_preguntas = "SELECT * FROM preguntas WHERE departamento = " . $row_original['id'];
        $resultado_preguntas = $conexion->query($sql_preguntas);

        while ($row = $resultado_preguntas->fetch_assoc()) {
            $pregunta = $row;
            if ($row["tipo_pregunta"] == "multiple") {
                $sql_opciones = "SELECT * FROM opciones_multiple WHERE pregunta = " . $pregunta['id'];
            } else {
                $sql_opciones = "SELECT * FROM opciones_verfal WHERE pregunta = " . $pregunta['id'];
            }
            $resultado_opciones = $conexion->query($sql_opciones);
            $opciones = [];

            while ($row_opcion = $resultado_opciones->fetch_assoc()) {
                $opciones[] = $row_opcion;
            }

            $pregunta["opciones"] = $opciones;
            $preguntas[] = $pregunta;
        }

        
        $sql = "SELECT * FROM list_departamentos WHERE id = $id_departamento";
        $resultado = $conexion->query($sql);
        $departamento = $resultado->fetch_assoc();

        $json["preguntas"] = $preguntas;
        $json["departamento"] = $departamento;

        echo json_encode($json, JSON_UNESCAPED_UNICODE);
    }
?>