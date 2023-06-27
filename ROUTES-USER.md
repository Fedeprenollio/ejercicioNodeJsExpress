USER


    Acciones:
        ○ Crear usuarios
        POST http://localhost:3002/user
        BODY:
            {   "user":"admin2",
                "firstName": "enriqe",
                "lastName":"diaz",
                "email":"fede222s@hot.com",
                "password":"fede"
            }


         ○ Optener todos los usuarios
         GET http://localhost:3002/user


         ○ Optener un  usuario
         GET http://localhost:3002/user/1


         ○ Elimnar un  usuario
         DELETE http://localhost:3002/user/1

         ○ Login 
         POST http://localhost:3002/login
         BODY:
              {
                "user":"admin",
                "password":"admin"
              }
