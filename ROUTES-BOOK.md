BOOKS

● Acciones
        ○ Crear libro (*) (AUTH)
            ● Crear un libro directamente con /book y enviar el id de la librería
        NOTA: Se puede crear sin asocialer alguna biblioteca, o se le puede agregar alguna mediante el atributo addToLibraryId
        POST http://localhost:3002/book
        BODY:
            {
            "isbn":3332,
            "title":"terminator 21",
            "author":"Perez",
            "year":"2001",
            "addToLibraryId": 2        
            }

        ○ Obtener un libro en particular
        GET http://localhost:3002/book/12

        ○ Obtener todos los libros
        GET http://localhost:3002/book

        ○ Modificar un libro (AUTH)
        NOTA: ademas de editar un libro, se le puede generar una asociacion a una libreria o elimarla a la misma mediante los atributos opcionales addToLibraryId y removeToLibraryId
        PUT http://localhost:3002/book/1
        BODY:
                {
                    "isbn": 1234,
                    "title":"El rengo 22",
                    "author":"Juan",
                    "year":"2001",
                    "addToLibraryId": 1             --->opcional
                    "removeToLibraryId": 1          --->opcional
                }
        ○ Eliminar un libro (**) (AUTH)
        DELETE http://localhost:3002/book/1