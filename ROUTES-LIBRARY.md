Libreria:

    ● Acciones
        ○ Crear librería (AUTH)
       POST http://localhost:3002/library
        BODY:
        {
            "name":"Biblioteca velez",
            "location":"Av colon 1234",
            "phone":"351333333"
        }


        ○ Obtener una librería
        Debe traer también todos los libros
        GET http://localhost:3002/library/1

        ○ Obtener todas las librerías
        Debe traer también todos los libros
        GET http://localhost:3002/library


        ○ Modificar una librería (AUTH)
        NOTA:* Se le puede modificar unicamente alguno de los atributos NAME, LOCATION, PHONOE o
             *Puede recibir libros o removerlos mediante el uso de un array dem bookIDs en la propiedad  receiveBooks o deleteBooks
        PUT http://localhost:3002/library/1
        BODY:
            {
                "name":"Biblioteca Velez Sarfield sucursal 1481",
                "location":"Av Velez Sarfield 1482",
                "phone":"351333333",
                "receiveBooks": [1,2,3,4]     ----> opcional
                "deleteBooks":[1,2,3,4,5,6]   ----> opcional
            }



        ○ Eliminar una librería (**) (AUTH)
        DELETE http://localhost:3002/library/6

        ○ Agregar un libro nuevo (*) (AUTH)
        Haciendo que la librería tenga un método para agregar un libro nuevo
        NOTA: En esta ruta se puede crear un libro nuevo con sus atributos y mediante un req.params se asocia inmediatamente  a la libreria con el id indicado
        POST http://localhost:3002/library/1/newBook   (:libraryID)
        BODY:
            {
            "isbn":37,
            "title":"libro economicoe??",
            "author":"Perez",
            "year":"2001"
        
            }