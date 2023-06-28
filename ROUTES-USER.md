USER


    Acciones:
        ○ Crear usuarios
        NOTA: Todos los usuarios creados tienen role: "User", por mas que se inyecte una propiedad "role":"Admin" en el body. Luego un admin puede cambiarlo a Admin
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

         ○  Editar un  usuario   by user
         NOTA: UN usuario solo se puede modificar a si mismo estando logueado y teniendo la password actual. NO SE PUEDE CAMBIAR SU ROLE
         NOTA: TODAS las propiedades del body son opcionales, salvo "currentPassword"
        PUT http://localhost:3002/user/3
        Para modificar un usuario se requiere el password actual
        BODY:
            {   "currentPassword":"fede",
                 "user":"riquelme",
                "firstName": "fede",
                "lastName":"prenollio",
                "email":"fede22q2s@hot.com",
                "newPassword":"fede33"
            }

        ○  Editar un  usuario   by ADMIN
         NOTA: UN usuario ADMIN puede modificar a cualquier USER estabdo logueado y proporcionando su contraseña
         NOTA: TODAS las propiedades del body son opcionales, salvo "currentPasswordAdmin" del admin
         NOTA: El Admin con id=1 (el admin original) no puede cambiar su rol, pues debe haber un admin si o si
         PUT http://localhost:3002/user/admin/3 
        BODY:
            {   "currentPasswordAdmin":"fede",
                "user":"riquelme",
                "firstName": "fede",
                "lastName":"prenollio",
                "email":"fede22q2s@hot.com",
                "newPassword":"fede33",
                "role": "Admin"
            }


         ○ Elimnar un  usuario
         DELETE http://localhost:3002/user/1

         ○ Login 
         POST http://localhost:3002/login
         BODY:
              {
                "user":"admin",
                "password":"admin"
              }
