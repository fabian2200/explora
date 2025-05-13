<?php
$departamentos = [
    "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá",
    "Caldas", "Caquetá", "Casanare", "Valle del Cauca", "Cauca", "Cesar", "Chocó", "Córdoba",
    "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena",
    "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda",
    "San Andrés, Providencia y Santa Catalina", "Santander", "Sucre", "Tolima", "Vaupés", "Vichada"
];

$palabrasClaveSinonimos = [
    [
        "palabra" => "capital",
        "tabla_bd" => "capital",
        "tabla_bd_list" => 0,
        "campo_bd" => "capital",
        "sinonimo" => [
            "capital",
            "cabecera",
            "metrópoli",
            "ciudad",
            "urbe",
            "centro",
            "sede",
            "nodo",
            "cabecera",
            "principal"
        ]
    ],
    [
        "palabra" => "clima",
        "tabla_bd" => "clima",
        "tabla_bd_list" => 0,
        "campo_bd" => "clima",
        "sinonimo" => [
            "clima",
            "tiempo",
            "atmósfera",
            "meteorología",
            "ambiente",
            "temperatura",
            "intemperie",
            "aerología",
            "estado",
            "condiciones"
        ]
    ],
    [
        "palabra" => "cultura",
        "tabla_bd" => "cultura",
        "tabla_bd_list" => 0,
        "campo_bd" => "descripcion",
        "sinonimo" => [
            "cultura",
            "civilización",
            "tradición",
            "costumbre",
            "identidad",
            "folclor",
            "herencia",
            "saberes",
            "arte",
            "sociedad"
        ]
    ],
    [
        "palabra" => "demografia",
        "tabla_bd" => "demografia",
        "tabla_bd_list" => 0,
        "campo_bd" => "poblacion",
        "sinonimo" => [
            "demografía",
            "población",
            "habitantes",
            "censo",
            "densidad",
            "estadística",
            "sociedad",
            "natalidad",
            "ciudadanía",
            "estructura"
        ]
    ],
    [
        "palabra" => "descripción",
        "tabla_bd" => "descripcion",
        "tabla_bd_list" => 0,
        "campo_bd" => "contenido",
        "sinonimo" => [
            "hablame",
            "describe",
            "explica",
            "explícame",
            "habla",
            "explicame",
            "descripción",
            "relato",
            "narración",
            "reseña",
            "explicación",
            "exposición",
            "detalle",
            "representación",
            "ilustración",
            "perfil"
        ]
    ],
    [
        "palabra" => "economia",
        "tabla_bd" => "economia",
        "tabla_bd_list" => 0,
        "campo_bd" => "economia",
        "sinonimo" => [
            "economía",
            "finanzas",
            "comercio",
            "mercado",
            "producción",
            "consumo",
            "ingresos",
            "gasto",
            "industria",
            "riqueza"
        ]
    ],
    [
        "palabra" => "etnografia",
        "tabla_bd" => "etnografia",
        "tabla_bd_list" => "etnografia_list",
        "campo_bd" => "contenido",
        "sinonimo" => [
            "etnografía",
            "cultura",
            "antropología",
            "etnicidad",
            "pueblo",
            "comunidad",
            "grupo",
            "indigena",
            "etnias",
            "etnia",
            "indios"
        ]
    ],
    [
        "palabra" => "fauna",
        "tabla_bd" => "fauna_flora",
        "tabla_bd_list" => "fauna_list",
        "campo_bd" => "fauna",
        "sinonimo" => [
            "fauna",
            "animales",
            "especies",
            "vertebrados",
            "mamíferos",
            "aves",
            "reptiles",
            "insectos",
            "anfibios",
            "biodiversidad"
        ]
    ],
    [
        "palabra" => "flora",
        "tabla_bd" => "fauna_flora",
        "tabla_bd_list" => "flora_list",
        "campo_bd" => "flora",
        "sinonimo" => [
            "flora",
            "plantas",
            "vegetación",
            "bosque",
            "selva",
            "árboles",
            "matorrales",
            "ecosistema",
            "biodiversidad",
            "naturaleza"
        ]
    ],
    [
        "palabra" => "festividad",
        "tabla_bd" => 0,
        "tabla_bd_list" => "festividad_list",
        "campo_bd" => "contenido",
        "sinonimo" => [
            "festividades",
            "celebración",
            "fiesta",
            "evento",
            "conmemoración",
            "tradición",
            "homenaje",
            "aniversario",
            "feria",
            "reunión"
        ]
    ],
    [
        "palabra" => "gastronomia",
        "tabla_bd" => "gastronomia",
        "tabla_bd_list" => 0,
        "campo_bd" => "gastronomia",
        "sinonimo" => [
            "gastronomía",
            "cocina",
            "alimentación",
            "comida",
            "platos",
            "recetas",
            "sazón",
            "sabores",
            "degustación",
            "culinaria"
        ]
    ],
    [
        "palabra" => "geografia",
        "tabla_bd" => "geografia",
        "tabla_bd_list" => 0,
        "campo_bd" => "ubicacion",
        "sinonimo" => [
            "geografía",
            "territorio",
            "región",
            "paisaje",
            "relieve",
            "espacio",
            "mapa",
            "zona",
            "suelo",
            "superficie",
            "ubicacion"
        ]
    ],
    [
        "palabra" => "hidrografia",
        "tabla_bd" => "hidrografia",
        "tabla_bd_list" => 0,
        "campo_bd" => "hidrografia",
        "sinonimo" => [
            "hidrografía",
            "ríos",
            "lagos",
            "acuíferos",
            "agua",
            "cuencas",
            "humedales",
            "corrientes",
            "nacientes",
            "arroyos"
        ]
    ],
    [
        "palabra" => "historia",
        "tabla_bd" => "historia",
        "tabla_bd_list" => 0,
        "campo_bd" => "historia",
        "sinonimo" => [
            "historia",
            "pasado",
            "cronología",
            "acontecimiento",
            "memoria",
            "origen",
            "trayectoria",
            "evolución",
        ]
    ],
    [
        "palabra" => "personaje",
        "tabla_bd" => 0,
        "tabla_bd_list" => "personaje_list",
        "campo_bd" => "contenido",
        "sinonimo" => [
            "personajes",
            "figuras",
            "individuos",
            "líderes",
            "personas",
            "protagonistas",
            "actores",
            "héroes",
            "celebridades",
            "referentes"
        ]
    ],
    [
        "palabra" => "sitios",
        "tabla_bd" => 0,
        "tabla_bd_list" => "sitios_list",
        "campo_bd" => "contenido",
        "sinonimo" => [
            "sitios",
            "lugares",
            "parajes",
            "zonas",
            "espacios",
            "destinos",
            "áreas",
            "regiones",
            "localidades",
            "ubicaciones",
            "turísticos",
            "puntos",
            "turistas"
        ]
    ]
];

$consultaEjemplo = $_GET['cadena'];
// Prueba con errores ortográficos
$resultado = procesarConsulta($consultaEjemplo);


if($resultado['success'] == true){
    $conexion_mysql = new mysqli("localhost", "root", "root", "explora");

    $departamento = $conexion_mysql->query("SELECT * FROM list_departamentos WHERE nombre = '$resultado[departamento]'");
    $departamento = $departamento->fetch_assoc();


    $descripcion = $conexion_mysql->query("SELECT * FROM departamento_descripcion WHERE departamento = $departamento[id]");
    $descripcion = $descripcion->fetch_assoc();

 
    $bd_solas = [
        "capital",
        "clima",
        "cultura",
        "demografia",
        "descripcion",
        "economia",
        "etnografia",
        "gastronomia",
        "geografia",
        "hidrografia",
        "historia",
    ];

    $bd_con_list = [
        "etnografia",
        "sitios",
        "personajes",
        "festividad"
    ];

    
    $tabla_bd = array_filter($palabrasClaveSinonimos, fn($palabra) => $palabra['palabra'] == $resultado['tabla_bd']);
    $tabla_bd = array_values($tabla_bd);

    $objeto = $tabla_bd[0];

    $tabla_bd = $objeto["tabla_bd"];
    $tabla_bd_list = $objeto["tabla_bd_list"];
    $campo_bd = $objeto["campo_bd"];

    $respuesta = [];
    $respuesta['success'] = true;

    if($tabla_bd == "descripcion"){
        $respuesta['mensaje'] = $conexion_mysql->query("SELECT contenido as descripcion FROM departamento_descripcion WHERE departamento = $departamento[id]");
        $respuesta['mensaje'] = $respuesta['mensaje']->fetch_assoc();
    }else{
        if($tabla_bd !== 0){
            $respuesta['mensaje'] = $conexion_mysql->query("SELECT $campo_bd as descripcion FROM departamento_$tabla_bd WHERE departamento = $descripcion[id]");
            $respuesta['mensaje'] = $respuesta['mensaje']->fetch_assoc();
        }
    }

    if($tabla_bd_list !== 0){
        $respuesta["array_list"] = $conexion_mysql->query("SELECT * FROM departamento_$tabla_bd_list WHERE departamento = $descripcion[id]");
        $respuesta["array_list"] = $respuesta["array_list"]->fetch_all(MYSQLI_ASSOC);
    }

    echo json_encode($respuesta);

}else{
    $respuesta['success'] = false;
    $respuesta['mensaje'] = $resultado['mensaje'];
    echo json_encode($respuesta);
}

function corregirTexto($entrada, $opciones) {
    $mejorCoincidencia = null;
    $menorDistancia = PHP_INT_MAX;

    foreach ($opciones as $opcion) {
        $distancia = levenshtein(strtolower($entrada), strtolower($opcion));

        if ($distancia < $menorDistancia) {
            $mejorCoincidencia = $opcion;
            $menorDistancia = $distancia;
        }
    }

    // Si la distancia es razonable (por ejemplo, 2 o menos), corregimos
   if ($menorDistancia <= 2) {
    return $mejorCoincidencia;
   }else{
    return null;
   }
}

$mejorCoincidencia2 = null;
$menorDistancia2 = PHP_INT_MAX;

function quitarTildes($cadena) {
    $originales = ['á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'ñ', 'Ñ'];
    $sustitutos = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'n', 'N'];
    return str_replace($originales, $sustitutos, $cadena);
}

function procesarConsulta($consulta) {

    global $palabrasClaveSinonimos, $departamentos;

    $palabrasPregunta = [
        "como",
        "que",
        "donde",
        "cuando",
        "quien",
        "porque",
        "cuantos",
        "cuantas"
    ];

    $consulta = strtolower($consulta);
    $departamentoEncontrado = null;
    $palabraClaveEncontrada = null;
   
    foreach ($departamentos as $departamento) {
        $departamento_minuscula = strtolower($departamento);
        $posicion = strpos($consulta, $departamento_minuscula);

        if($posicion !== false){
            $departamentoEncontrado = $departamento;  
            break;
        }else{
            $departamento_minuscula = quitarTildes($departamento);
            $departamento_minuscula = strtolower($departamento_minuscula);
            $posicion = strpos($consulta, $departamento_minuscula);
            
            if($posicion !== false){
                $departamentoEncontrado = $departamento;
                break;
            }
        }

        if(strpos($consulta, "san andres") !== false || strpos($consulta, "providencia") !== false || strpos($consulta, "santa catalina") !== false){
            $departamentoEncontrado = "San Andrés, Providencia y Santa Catalina";
            break;
        }
    }


    $palabras = explode(" ", $consulta);

    $palabras = array_filter($palabras, fn($p) => strlen(trim($p)) >= 4);
    $palabras = array_values($palabras);

    $palabras = array_filter($palabras, fn($p) => !in_array($p, $palabrasPregunta));
    $palabras = array_values($palabras);

    if ($departamentoEncontrado == null) {
         return [
            "success" => false,
            "mensaje" => "<p>Debe especificar el departamento, para poder buscar la información.</p><i><p>Ejemplo: Amazonas</p></i>"
        ];
    }else{
        $palabrasFiltradas = array_filter($palabras, fn($palabra) => $palabra != $departamentoEncontrado);
       
        foreach ($palabrasFiltradas as $palabra) {
            global $mejorCoincidencia2, $menorDistancia2;
            $mejorCoincidencia2 = null;
            $menorDistancia2 = PHP_INT_MAX;
            foreach ($palabrasClaveSinonimos as $sinonimo) {
                $posiblePalabraClave = corregirTexto2($palabra, $sinonimo['sinonimo'], $sinonimo['palabra']);
                if($posiblePalabraClave != null && $posiblePalabraClave['distancia'] <= 2){
                    $palabraClaveEncontrada = $posiblePalabraClave;
                    break;
                }
            }

            if($palabraClaveEncontrada != null){
                break;
            }
        }

        if ($palabraClaveEncontrada != null) {
            $tabla_bd = $palabraClaveEncontrada['palabra_original'];
            $palabraClaveEncontrada = $palabraClaveEncontrada['palabra_corregida'];
        }

        if ($palabraClaveEncontrada == null) {
            return [
                "success" => false,
                "mensaje" => "<p>No encontré resultados para la consulta, pruebe con otras palabras clave, aca un listado de palabras clave:</p><ul class='list-palabras-clave'><li>Capital</li><li>Clima</li><li>Cultura</li><li>Demografia</li><li>Economía</li><li>Etnografía</li><li>Gastronomía</li><li>Geografía</li><li>Hidrografía</li><li>Historia</li><li>Personajes</li><li>Sitios</li><li>Festividades</li></ul> <p style='font-weight: bold; font-style: italic;'>Ejemplo: Capital de Amazonas</p>"
            ];
        }
    }


    return [
        "success" => true,
        "departamento" => $departamentoEncontrado,
        "palabra_clave" => $palabraClaveEncontrada,
        "tabla_bd" => $tabla_bd
    ]; 
}

function corregirTexto2($entrada, $opciones, $palabra_original) {
    global $mejorCoincidencia2, $menorDistancia2;
   
    foreach ($opciones as $opcion) {
        $distancia = levenshtein(strtolower($entrada), strtolower($opcion));
        if ($distancia < $menorDistancia2) {
            $mejorCoincidencia2 = $opcion;
            $menorDistancia2 = $distancia;
        }
    }

    if ($menorDistancia2 <= 2) {
        return [
            "palabra_original" => $palabra_original,
            "palabra_corregida" => $mejorCoincidencia2,
            "distancia" => $menorDistancia2
        ];
    }else{

        return null;
    }
}
?>
