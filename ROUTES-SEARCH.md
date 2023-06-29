He creado dos simples ruta para hacer busquedas.
La diferencia radica en que:
    - Un USER logueado puede realizar busquedas de LIBROS y LIBRRIAS
    - Un SUPER ADMIN puede realizar además búsquedas de usuarios

    NOTA: -el req.query "q" puede ser cualquier parametro de busqueda, por ejmplo podemos buscar libros por su nombre, autor, isbn, y las bibliotecas por su nombre, ubicacion, telefono. De un user su email, nombre, apellido, nombre de usuario etc. 
          -La busqueda puede ser parcial, se realizan por medio de un { [Op.like]: `%${q}%` } es decir que el  % inicial y final indican que puede haber cualquier cadena de caracteres antes y después de la subcadena "${q}". Esto buscará registros cuyo nombre contenga "q" en cualquier posición de la cadena.
    
    SEARCH
    *Busqueda por parte de los USERs
    GET http://localhost:3002/search?q=El princi

    * Busqueda por parte del SUPER ADMIN
    GET http://localhost:3002/search/admin?q=Federico