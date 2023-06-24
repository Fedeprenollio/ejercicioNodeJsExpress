// ● Acciones
// ○ Crear libro (*) (AUTH)
const createUser = async (user) => {
    return await userProvider.createUser(user);
  };


// ○ Obtener un libro en particular
// ○ Obtener todos los libros
// ○ Modificar un libro (AUTH)
// ○ Eliminar un libro (**) (AUTH)


module.exports = {createUser}