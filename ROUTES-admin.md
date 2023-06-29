Rutas extras, no solicitadas para el trabajo practico, que solo puede hacer un usuario ADMIN

    *Obetener todas las librerias
        NOTA: la query deleted es para traer o no las librerias eliminadas, deleted=yes setea la busqueda con un paranoid=false y trae todas, incluidas las elimindas,
                por el contrario, deleted=no ignora los elementos eliminados
     GET   http://localhost:3002/admin/library?deleted=false


    *Obetener una libreria en particular, incluyendo si està eliminada o no
        NOTA: la query deleted es para traer o no la libreria, pudiendo o no estar elinada. con deleted=yes setea la busqueda con un paranoid=false y trae la libreria sin importar si esta o no eliminada la misma.
                pPr el contrario, deleted=no ignora los elementos eliminados
    GET    http://localhost:3002/admin/library/:idLibrary?deleted=false




     *recuperar una libreria en particular cuando està eliminada
        NOTA: la query deleted es para traer o no la libreria, pudiendo o no estar elinada. con deleted=yes setea la busqueda con un paranoid=false y trae la libreria sin importar si esta o no eliminada la misma.
                pPr el contrario, deleted=no ignora los elementos eliminados
    PUT   http://localhost:3002/admin/library/1