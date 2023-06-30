# ejercicioNodeJsExpress

# API LIBRARY-BOOK-USER - NODE.JS

## Resumen

Este es un proyecto de Node.js que utiliza Express y Sequelize para crear una aplicación web. La aplicación utiliza JWT (JSON Web Tokens) para autenticación y bcrypt para el cifrado de contraseñas. También se incluyen algunas herramientas de desarrollo como Nodemon y ESLint estandarizar el codigo.



## Dependencias
###  De desarrollo:

- bcrypt: Se utiliza para el cifrado de contraseñas y la verificación de contraseñas cifradas en aplicaciones web.
- express: Es un marco de aplicación web para Node.js que simplifica el desarrollo de API y aplicaciones web.
- jsonwebtoken: Permite la generación y verificación de tokens JWT (JSON Web Tokens) para la autenticación y autorización en aplicaciones web.
- passport: Es un middleware de autenticación para Node.js que proporciona estrategias de autenticación flexibles y extensibles.
- passport-jwt: Una estrategia de autenticación para Passport que utiliza tokens JWT para autenticar las solicitudes entrantes.
- sequelize: Un ORM (Object-Relational Mapping) de Node.js que facilita la interacción con la base de datos SQL mediante la representación de las tablas de la base de datos como modelos de objetos.
- sqlite3: Un controlador de base de datos SQLite para Node.js que permite interactuar con bases de datos SQLite desde una aplicación Node.js.

### De Producción:
- eslint: Una herramienta de linting que ayuda a mantener un código JavaScript limpio y coherente, siguiendo reglas y convenciones predefinidas o personalizadas.
- nodemon: Una utilidad que monitoriza los cambios en los archivos de la aplicación y reinicia automáticamente el servidor Node.js cuando se detectan cambios. Es útil durante el desarrollo para agilizar el ciclo de desarrollo y evitar tener que reiniciar manualmente el servidor cada vez que se realizan cambios en el código.

## Requisitos

- Node.js (versión 19.9.0)
- NPM (versión 9.6.3)

## Instalación
1. Ejecuta el siguiente comando para instalar las dependencias: <br>

        npm install


2. Asegúrate de configurar correctamente las variables de entorno.

        En éste caso tengo todo hardcodeado, pues no hay peligro de codigo expuesto

3. Inicia la aplicación ejecutando el siguiente comando:

        npm start

    Esto iniciará la aplicación y estará disponible en [http://localhost:3002](http://localhost:3002)




## Estructura de Archivos

- `index.js`: Punto de entrada de la aplicación.
- `app.js`: Configuración principal de la aplicación Express.
- `routes/`: Carpeta que contiene las definiciones de las rutas de la aplicación.
- `controllers/`: Carpeta que contiene archivos que definen las funciones que se ejecutarán cuando se solicita una ruta específica con la logica HTTP.
- `services/`: Carpeta que contiene archivos que encapsulan la ***lógica de negocio*** de la aplicación, proporcionando una abstracción de alto nivel de las operaciones realizadas por los controladores y otros componentes de la aplicación.
- `providers/`: Carpeta que contiene archivos que definen proveedores de servicios que pueden ser inyectados en diferentes componentes de la aplicación, se utilizan para configurar y crear instancias de otros objetos de la aplicación, como bases de datos, bibliotecas de terceros, servicios web, y otros componentes que la aplicación necesita para funcionar.
- `models/`: Carpeta que contiene las definiciones de los modelos de la base de datos utilizando Sequelize.
- `middlewares/`: Carpeta que contiene los middlewares utilizados en la aplicación.
- `config/`: Carpeta que contiene archivos de configuración de la base de datos.
- `Utils/`: Carpeta que contiene archivos con funciones que se utilizan en diferentes directorios y no llevan logica de negocios.

## Descripción del proceso de desarrollo.
Voy a describir el proceso de desarrollo de algunas rutas.
Empezando por la creacion de una biblioteca nueva lo pasos son:

    DIRECTORIO ROUTES
   1. En la carpeta routes/ definimos un archivo routes.js él contendrá todas las rutas relacionadas a las bibliotecas.
   2. En ese mismo archivo se importa express y se crea un router el cual luego se exporta.
   3. Importamos controllers y middlewares necesarios que serán necesarios
   4. Creamos la ruta con su metodo, en este caso:

        ```javascript
            router.post('/', jwtValidMDW, libraryController.createLibrary).
        ```
   5. En el mismo directorio creamos el archivo index.js el cual nos proveera un indice de todas los routers que tendremos disponibles para exporar.

    DIRECTORIO CONTROLLERS
   1. En la carpeta controllers/, creamos un archivo libraryController.js para definir las funciones que se ejecutarán cuando se solicite la ruta de creación de una biblioteca.
    De ésta manera separamos la definición de rutas de la ***logica*** de los métodos HTTP, por ejemplo la infomación que nos brinda las request,  los status de error o el envio correcto de la response.
   2. También creamos un index.js en éste directorio para poder un indice de todos los controllers que seran usado en las diferentes rutas.


    DIRECTORIO SERVICES
   1. En la carpeta service/, creamos un archivo libraryService.js para  creación de una biblioteca.
    De ésta manera separamos  ***logica*** de negocio de la ***lógica*** del controller.
    El resultado de esto son controladores simples y limpios centrados unicamente en la gestion de las request y response  y nuestra logica de negocio puede estar en diferentes servicios, tambìen muy limpios y claros. <br>
        Por ejemplo en mi caso
       ``` javascript
            const createLibrary = async (library) => {
             return await libraryProvider.createLibrary(library)
            }
        ```
        este servicio se encarga unicamente de crear una libreria, y no de status, ni recibir queries, params o body etc
   2. También creamos un index.js en éste directorio para poder un indice de todos los serveices que seran usados en las diferentes controllers.

    DIRECTORIO PROVIDERS
   1. En la carpeta providers/, creamos un archivo libraryProviders.js para la  creación de una biblioteca.
    De ésta manera tendremos funciones que pueden ser usadas en diferentes partes del proyecto, como en los services. Aqui tendremos acesso e interaccion con otros objetos de la aplicación, como por ejemplo a los modelos (Library). Pero tambìen yo podría tener acceso a servicios de terceros  o webs. 
    De esta manera separamos la ***logica de negocio*** de la ***configuración o creacion de objetos***. <br>
    Los servicios no tendrian contacto con los modelos en nuestro ejemplo. Se sacan de encima la resonsabilidad de crear, ordenar, filtrar etc. Simplemente reciben el objeto creado, ordenado, filtrado etc.     
    
   2. También creamos un index.js en éste directorio para poder tener un indice de todos los provider que seran usados en las diferentes servicios.

    DIRECTORIO MIDDLEWARES
   1. En la carpeta middlewares/ definimos un archivo auth-mdw.js, él contendrá todos los middlewares relaciones con la autenticaciòn y roles. Éstos pueden ser usar antes de ciertas solicitus HTTP para verificar y dar permisos a esas rutas.
   En mi caso tengo 3 middlewares:
      1. **jwtValidMDW**: Verificamos si el token es valido o no para nuestra ***estrategia***. Util para ver si el usuario es valido en nustro registro. Basicamente concede persmiso a los usuarios User.
      2. **userIsAdmin**: Ademas del nivel de seguridad anterior, verificamos que el usuario es o no Admin. 
      3. **userIsSuperAdmin**: Ademas del nivel de seguridad anterior, verificamos que el administrador es el de mayor jerarquìa de nuestro sistema. El el administrador que se genera de manera ***default*** al inicializar nuestra base de datos. Tiene permiso a acciones unicas como restarurar elementos eliminados o realizar cambios de roles. NO puede ser eliminado ni tampoco cambiar de rol a User 



    DIRECTORIO UTILS
   1. La carpeta Utils/  contiene *lógica*  que puede ser usada en cualquier parte de la aplicación y no tiene nada que ver con la *lògica de negocio*. En éste trabajo tengo dos archivos en Untils, uno para generacion del encriptado y comparacion de contraseñas. Otro para la  generacion del token
   2. Nuevamente tengo un index para poder gestionar todos las funciones *"utiles"*
   

## Uso
Al inicializar la base de datos se creará un usuario con el rango mas alto con id=1

```javascript

const SuperAdmin =  {
user: 'admin',
firstName: 'Im The Super-Admin ',
lastName: 'Perez',
password: "admin",
email: 'admin@admin.com',
role: 'Admin'
}

```
Luego, podras tambien, mediante las diferentes rutas y segun el rango de permisos de los diferentes ususarios
- Crear nuevos usuarios, editarlos, eliminiarlos, recuperarlos
- Crear nuevas librerias, editarlas, eliminarlas, recupeararlas, asignale libros y sacarselos
- Crear nuevos libros, editarlos, eliminarlos, recupearlos, asignarle una biblioteca y removerlo de ella
- Realizar busqueda de libros, librerias y usuarios
- Filtrar por elementos eliminados, no eliminados o verlos todos juntos
# Rutas generales

Las he dividido en dos grupos, por un lado las que fueron pedidas  en el trabajo pràctico, en en segundo lugar... ***Francia*** 😄 . Hablando enserio,en segundo lugar rutas que vi interesante realizar 

NOTA DE AUTENTICACION/AUTORIZACIÓN:
   1. **AUTH**: Cualquier usuario logueado (User).
   2. **ADMIN**:Cualquier usuario Admin.
   3. ***SUPER-ADMIN***: Unicamente el Admin incial, con id=1

## Pediddas por el TP:


### ***LIBRARIES***.

1. Crear librería **(AUTH)** <br>
    METHOD: POST

            http://localhost:3002/library
            
    ```javascript
    //BODY:
    {
    "name":"Biblioteca velez",   //not null
    "location":"Av colon 1234",  //Unique - not null
    "phone":"351333333"          //not null - String, pero unicamente numeros recibe
    }
    ```

2.  Obtener una librería <br>
    METHOD: GET

            http://localhost:3002/library/:librayID

3. Obtener todas las librerías <br>
    METHOD: GET

            http://localhost:3002/library

4. Modificar una librería **(AUTH)** <br>
    NOTA:* Se le puede modificar unicamente alguno de los atributos NAME, LOCATION, PHONE, o TODOS
            * También puede recibir libros o removerlos mediante el uso de un array de bookIDs en la propiedad  *receiveBooks* o *deleteBooks*
    METHOD: PUT

            http://localhost:3002/library/:libraryID


    ```javascript
    //BODY:
    {
    "name":"Biblioteca Velez Sarfield sucursal 1",      //----> opcional
    "location":"Av Velez Sarfield 1482",                //----> opcional
    "phone":"351333333",                                //----> opcional
    "receiveBooks": [1,2,3,4]                           //----> opcional
    "deleteBooks":[1,2,3,4,5,6]                         //----> opcional
    }
    ```
    

5. Eliminar una librería (**) **(AUTH)** <br>
   METHOD: DELETE

                http://localhost:3002/library/:libraryID

6. Agregar un libro nuevo (*) **(AUTH)** <br>
        Haciendo que la librería tenga un método para agregar un libro nuevo <br>
        NOTA: En esta ruta se puede crear un libro nuevo con sus atributos y mediante un req.params se asocia inmediatamente  a la libreria con el id indicado <br>
        METHOD: POST

                http://localhost:3002/library/:libraryID/newBook


    ```javascript 
    // BODY:
    {
    "isbn":37,                          //not null
    "title":"libro economicoe??",       //not null
    "author":"Perez",                   //not null
    "year":"2001"                       //not null - String pero solo recibe numeros

    } 
    ```
                    
                    
### **BOOKS**

1. Crear libro (*) **(AUTH)** <br>
    ● Crear un libro directamente con /book y enviar el id de la librería <br>
    NOTA: Se puede crear sin asocialer alguna biblioteca, o se le puede agregar alguna mediante el atributo addToLibraryId <br>
    METHOD: POST


            http://localhost:3002/book

                
    ```javascript
    //BODY:
    {
    "isbn":3332,                        //----> opcional
    "title":"terminator 21",            //----> opcional
    "author":"Perez",                   //----> opcional
    "year":"2001",                      //----> opcional
    "addToLibraryId": 2                 //----> opcional
    }
    ```
2. Obtener un libro en particular
   METHOD: GET


             http://localhost:3002/book/:bookID

3. Obtener todos los libros
   METHOD: GET

             http://localhost:3002/book

4. Modificar un libro **(AUTH)** <br>
   NOTA: ademas de editar un libro, se le puede generar una asociacion a una libreria o elimarla a la misma mediante los atributos opcionales addToLibraryId y removeToLibraryId <br>
   METHOD: PUT

            http://localhost:3002/book/:bookId

               
    ```javascript
    // BODY:
    {
    "isbn": 1234,                   //--->opcional
    "title":"El rengo 22",          //--->opcional
    "author":"Juan",                //--->opcional
    "year":"2001",                  //--->opcional
    "addToLibraryId": 1             //--->opcional
    "removeToLibraryId": 1          //--->opcional
    }
    ```


5. Eliminar un libro (**) **(AUTH)** <br>
   METHOD: DELETE

            http://localhost:3002/book/:bookID

    
### ***USER***


1. Crear usuarios **(ADMIN)** <br>
        NOTA: Todos los usuarios creados tienen role: "User", por mas que se inyecte una propiedad "role":"Admin" en el body. <br>
        METHOD: PUT

            http://localhost:3002/user 

            
    ```javascript
    //BODY:
    {   "user":"admin2",                //Unique - Sin espacios - not null
    "firstName": "enriqe",              // not null
    "lastName":"diaz",                  // not null
    "email":"fede222s@hot.com",         //Unique - email valido - not null
    "password":"fede"                   // not null - sin restricciones para èste trabajo práctico
    }
    ```

2. Obtener todos los usuarios **(ADMIN)** <br>
   METHOD: GET

            http://localhost:3002/user


3. Obtener un  usuario  **(ADMIN)**<br>
    METHOD: GET

            http://localhost:3002/user/:userID

4. Editar un  usuario   ***por él mismo*** **(AUTH)**  <br> 
         NOTA: UN usuario solo se puede modificar a si mismo estando logueado y teniendo la password actual. NO SE PUEDE CAMBIAR SU ROLE ASI MISMO, SOLO LO HACE EL SOPER-ADMIN<br>
         NOTA: TODAS las propiedades del body son opcionales, salvo "currentPassword" que es obligario<br>
         METHOD: PUT

            http://localhost:3002/user/:userId 


    ```javascript
    //BODY:
    {   "currentPassword":"fede",   ---->Se requiere tener la password acual, en caso de olvido, perdile al SUPER-ADMIN la modificacion (VER RUTAS NO PEDIDAS)
    "user":"riquelme",              // OPCIONAL
    "firstName": "fede",            // OPCIONAL
    "lastName":"prenollio",         // OPCIONAL
    "email":"fede22q2s@hot.com",    // OPCIONAL
    "newPassword":"fede33"          // OPCIONAL
    }
    ```


5. Elimnar un  usuario **(ADMIN)** <br>
    METHOD: DELETE

            http://localhost:3002/user/:userId   

6. Login <br>
    METHOD: POST

            http://localhost:3002/login


    ```javascript
    //BODY:
    {
    "user":"admin",
    "password":"admin"
    }
    ```

## Rutas NO Pediddas por el TP:

### ***/ADMIN***

Rutas extras, no solicitadas para el trabajo practico. <br>

## OBETENER ITEMS (eliminados incluidos )


LIBRARY
1. Obetener todas las librerias, aun las deleteadas  **(ADMIN**) <br>
    NOTA: la query bring es para traer o no las librerias eliminadas, <br>
    1. bring=all setea la busqueda con un paranoid=false y trae todas, incluidas las elimindas,
    2. bring=no-deleted ignora los elementos eliminados
    3. bring=deleted trae solamente los resultados eliminados
    METHOD: GET

                http://localhost:3002/admin/library?bring=deleted 



2. Obetener una libreria en particular, incluyendola si està eliminada o no **(ADMIN)**
    METHOD: GET

                http://localhost:3002/admin/library/:idLibrary

BOOK
1. Obetener todas los libros, aun las deleteadas **(ADMIN)** <br>
        NOTA: la query bring es para traer o no las librerias eliminadas,                
        bring=all setea la busqueda con un paranoid=false y trae todas, incluidas las elimindas,
        bring=no-deleted ignora los elementos eliminados
        bring=deleted trae solamente los resultados eliminados
        METHOD: GET

                http://localhost:3002/admin/book?bring=deleted 


2. Obetener un libro en particular, incluyendola si està eliminada o no  **(ADMIN)** <br>
        METHOD: GET

                http://localhost:3002/admin/book/:idBook 



USER
1. Obetener todos los user, aun las deleteadas **(ADMIN)** <br>
        NOTA: la query bring es para traer o no las librerias eliminadas, 
        bring=all setea la busqueda con un paranoid=false y trae todas, incluidas las elimindas,
        bring=no-deleted ignora los elementos eliminados
        bring=deleted trae solamente los resultados eliminados
        METHOD: GET

                http://localhost:3002/admin/user?bring=deleted 


2. Obetener un user en particular, incluyendola si està eliminada o no **(ADMIN)** <br>
    METHOD: GET

                http://localhost:3002/admin/user/:idUser 

   

## RECOVER DELETED ITEMS (only the SUPER ADMIN can do it )

LIBRARY
1. Recuperar una libreria  **(SUPER-ADMIN)**  <br>
    METHOD: PUT

                http://localhost:3002/admin/library/restore/:libraryId


2. Recuperar todas las librerias  **(SUPER-ADMIN)**  <br>
    METHOD: PUT

            http://localhost:3002/admin/library/restore


BOOK
1. Recuperar un libro en particular   **(SUPER-ADMIN)** <br>
    METHOD: PUT

            http://localhost:3002/admin/book/restore/:bookID

2. Recuperar todos los libros  **(SUPER-ADMIN)**  <br>
    METHOD: PUT

            http://localhost:3002/admin/book/restore 

USER
1. Recuperar un user en particular  **(SUPER-ADMIN)** <br>
    METHOD: PUT

            http://localhost:3002/admin/user/restore/:userId 

2. Recuperar un user en particular  **(SUPER-ADMIN)** <br>
    METHOD: PUT

             http://localhost:3002/admin/user/restore/:userId

## UPDATE USER BY SUPER-ADMIN

1. Actualizar a un usuario o administrador, tanto su informacion como su rol, o proveerle una nueva constraseña en caso de olvido (Luego el usuario deberia cambiarla nuevamente por su seguridad)  **(SUPER-ADMIN)**
    NOTA: El SUPER-ADMIN no puede cambiarse de role (Tampoco eliminarse a si mismo ni por nadie)
    METHOD: PUT

                http://localhost:3002/admin/user/:userId


    ```javascript
    //BODY:
    {   "currentPasswordAdmin":"admin",   ---->Se requiere tener la password acual del superAdmin.
    "user":"riquelme",                      // OPCIONAL
    "firstName": "fede",                    // OPCIONAL
    "lastName":"prenollio",                 // OPCIONAL
    "email":"fede22q2s@hot.com",            // OPCIONAL
    "newPassword":"fede33" ,              ------> El SUPER-ADMIN puede dar nuevas contraseñas
    "role": "Admin"                         //Los unicos valores posibles son "Admin" o "User"
    }
    ```



## SEARCH ITEMS    
1. Buscar entre los libros y librerias (Unicamente los User y Admin)<hr>
    NOTA: NO busca elementos eliminados  **(AUTH / ADMIN)**  <hr>
    Se retorna un objeto con los resultados de libros, librerias:
    METHOD: GET

                http://localhost:3002/search?q=el prin  


    ```javascript
    //resultado de la busqueda, observe que solo retorna libros o librerias
    {
    "success": true,
    "result": {
        "library": [],
        "book": []
        }
    }
    ```

2. Buscar entre los libros y librerias y ademas entre los usuarios **(SUPER-ADMIN)**
    NOTA: SI encuentra elementos eliminados
    Se retorna un objeto con los resultados de libros, librerias y usuarios:
    METHOD: GET

                http://localhost:3002/search?q=el princ 


    ```javascript
    //Notese que en éste caso tambien nos retorna los resultados de usuarios. Todos los resultados incluye a los eliminados
    {
    "success": true,
    "result": {
        "library": [],
        "book": [],
        "user": []
        }
    }
    ```
