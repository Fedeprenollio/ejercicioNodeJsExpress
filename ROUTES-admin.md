Rutas extras, no solicitadas para el trabajo practico.Solo puede hacer un usuario ADMIN
HAY DOS TIPOS DE ADMIN,
    -EL ADMIN ID=1 es un SUPER ADMIN, es el unico que puede recuperar elementos eliminadas
    -Cualquier otro ADMIN

GETS:

    LIBRARY
    *Obetener todas las librerias, aun las deleteadas
        NOTA: la query bring es para traer o no las librerias eliminadas, 
        bring=all setea la busqueda con un paranoid=false y trae todas, incluidas las elimindas,
        bring=no-deleted ignora los elementos eliminados
        bring=deleted trae solamente los resultados eliminados
     GET   http://localhost:3002/admin/library?bring=deleted


    *Obetener una libreria en particular, incluyendola si està eliminada o no
    GET    http://localhost:3002/admin/library/:idLibrary


    BOOK
    *Obetener todas los libros, aun las deleteadas
        NOTA: la query bring es para traer o no las librerias eliminadas, 
        bring=all setea la busqueda con un paranoid=false y trae todas, incluidas las elimindas,
        bring=no-deleted ignora los elementos eliminados
        bring=deleted trae solamente los resultados eliminados
     GET   http://localhost:3002/admin/book?bring=deleted

    *Obetener un libro en particular, incluyendola si està eliminada o no
    GET    http://localhost:3002/admin/book/:idBook



    USER
    *Obetener todos los user, aun las deleteadas
        NOTA: la query bring es para traer o no las librerias eliminadas, 
        bring=all setea la busqueda con un paranoid=false y trae todas, incluidas las elimindas,
        bring=no-deleted ignora los elementos eliminados
        bring=deleted trae solamente los resultados eliminados
     GET   http://localhost:3002/admin/user?bring=deleted


    *Obetener un user en particular, incluyendola si està eliminada o no
    GET    http://localhost:3002/admin/user/:idUser

   

RECOVER DELETED ITEMS (only the SUPER ADMIN can do it )

    LIBRARY
    *Recuperar una libreria
    PUT http://localhost:3002/admin/library/restore/:libraryId

     *Recuperar todas las librerias
    PUT http://localhost:3002/admin/library/restore

    BOOK
    *Recuperar un libro en particular
    PUT http://localhost:3002/admin/book/restore/1

    *Recuperar un libro en particular
    PUT http://localhost:3002/admin/book/restore/:bookId

    USER
    *Recuperar un user en particular
    PUT http://localhost:3002/admin/book/restore/1

    *Recuperar un user en particular
    PUT http://localhost:3002/admin/book/restore/:userId