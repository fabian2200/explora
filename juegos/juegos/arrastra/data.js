const gameData = {
    categories: [
        {
            id: "etnias",
            name: "Etnias de Colombia",
            image: "../../../maps_etnias/etnias.webp",
            mapa: "../mapas/gris/etnias.png",
            locations: [
                { name: "GUAHIBOS", x: "0.5959", y: "0.2995" },
                { name: "MOKANÁ", x: "0.3726", y: "0.1011" },
                { name: "ZENÚ", x: "0.3270", y: "0.1982" },
                { name: "MUISCAS", x: "0.5119", y: "0.4571" },
                { name: "PAECES (NASA)", x: "0.3098", y: "0.4869" },
                { name: "KANKUAMOS", x: "0.4709", y: "0.1282" },
                { name: "ARHUACOS", x: "0.4334", y: "0.0894" },
                { name: "NUKAK", x: "0.5441", y: "0.5947" },
                { name: "WAYÚUS", x: "0.5337", y: "0.0586" },
                { name: "QUILLACINGA", x: "0.2020", y: "0.6193" },
                { name: "BARÍ", x: "0.4971", y: "0.2171" },
                { name: "INGAS", x: "0.3276", y: "0.6219" },
                { name: "CHAMÍES (EMBERÁ-CHAMÍ)", x: "0.3489", y: "0.3133" },
                { name: "Raizales de San Andrés", x: "0.1393", y: "0.0366" },
                { name: "Uwa", x: "0.4782", y: "0.3332" },
                { name: "PIJAOS", x: "0.4239", y: "0.5445" },
                { name: "CUBEO", x: "0.7408", y: "0.3457" },
                { name: "Rrom", x: "0.3820", y: "0.4427" },
                { name: "PALENQUEROS", x: "0.4221", y: "0.2280" },
                { name: "PIAPOCOS", x: "0.6204", y: "0.4754" },
                { name: "AFROCOLOMBIANOS", x: "0.2747", y: "0.3980" },
                { name: "PUINAVE", x: "0.7513", y: "0.5429" },
                { name: "TUKANO", x: "0.6362", y: "0.6579" },
                { name: "COREGUAJE", x: "0.4584", y: "0.6684" },
                { name: "YAGUA", x: "0.5672", y: "0.7877" }
            ]
        },
        {
            id: "capitales",
            name: "Capitales de Colombia",
            image: "https://via.placeholder.com/500x500",
            mapa: "../mapas/gris/politico.png",
            locations: [
                { x: 0.25, y: 0.25, name: "Madrid" },
                { x: 0.75, y: 0.25, name: "París" },
                { x: 0.25, y: 0.75, name: "Roma" },
                { x: 0.75, y: 0.75, name: "Berlín" },
                { x: 0.5, y: 0.5, name: "Lisboa" }
            ]
        },
        {
            id: "parques",
            name: "Parques Naturales de Colombia",
            image: "https://via.placeholder.com/500x500",
            mapa: "../mapas/gris/parques.png",
            locations: [
                { x: 0.25, y: 0.25, name: "León" },
                { x: 0.75, y: 0.25, name: "Tigre" },
                { x: 0.25, y: 0.75, name: "Elefante" },
                { x: 0.75, y: 0.75, name: "Jirafa" },
                { x: 0.5, y: 0.5, name: "Cebra" }
            ]
        },
        {
            id: "sitios_turisticos",
            name: "Sitios Turísticos de Colombia",
            image: "https://via.placeholder.com/500x500",
            mapa: "../mapas/gris/relieve.png",
            locations: [
                { x: 0.25, y: 0.25, name: "Catedral de Bogotá" },
                { x: 0.75, y: 0.25, name: "Castillo de San Felipe" },
                { x: 0.25, y: 0.75, name: "Museo del Oro" },
                { x: 0.75, y: 0.75, name: "Plaza de Bolívar" },
                { x: 0.5, y: 0.5, name: "Palacio de la Moneda" }
            ]
        }
    ],
    currentCategory: null
}; 