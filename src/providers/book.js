const { Library, Book } = require("../models");



// ● Acciones
// ○ Crear libro (*) (AUTH)
//NOTA: le puedo asiganar una biblioteca al momento de crearlo mediante el body o mediante un paramId por ejemplo, 
// en mi caso, he elegido asignarlo mediante el bodu
const createBook = async (book, libraryId) => {
    try {
    
      const newBook = await Book.create({...book});


        //Si entre el body viene una propiedad llamada "addToLibraryId" quiere decir que quiero asociar un libro existente a una biblioteca
        if( book.addToLibraryId){
          const addToLibrary = await Library.findByPk(book.addToLibraryId);
          await newBook.setLibrary(addToLibrary);
          // await addToLibrary.setBook(book)
          await newBook.save()
  
        }
      
      return { success: true, book: newBook };
        } catch (error) {
      console.log(`Error when creating library, ${error}`);
      return { success: false, error: error.message }
    }
  };

  // ○ Obtener un libro en particular
  // ○ Obtener todos los libros
  const getBook = async (bookId) => {
    try {
      if (!bookId) {
        const foundBooks = await Book.findAll({ include: { all: true } });

        if (foundBooks.length === 0) {
          return { success: false, error: 'No se encontraron libros' };
        }

        return  { success: true, book: foundBooks };
      }else{

        const foundBook = await Book.findByPk(bookId, {
          include: { all: true },
        });

        if(!foundBook) {
          return { success: false, error: "Book not found" };
        }

        return { success: true, book: foundBook };
      }
    } catch (error) {
      console.log(`Error looking for library, ${error}`);
      return  { success: false, error: error.message }
    }
  };
  
  


  // ○ Modificar un libro (AUTH)
  const updateBook = async (bookId, newData) => {
    try {

      //Si entre el body viene una propiedad llamada "addToLibraryId" quiere decir que quiero asociar un libro existente a una biblioteca
      if( newData.addToLibraryId){
        const book = await Book.findByPk(bookId);
        const addToLibrary = await Library.findByPk(newData.addToLibraryId);
        await book.setLibrary(addToLibrary);
        // await addToLibrary.setBook(book)
        await book.save()

      }else if( newData.removeToLibraryId){ //Si entre el body viene una propiedad llamada "removeToLibraryId" quiere decir que quiero eliminar un libro existente a una biblioteca
        const book = await Book.findByPk(bookId);
        const removeToLibrary = await Library.findByPk(newData.removeToLibraryId);
        // await book.setLibrary(null)
        await removeToLibrary.removeBook(book);
        await book.save()
      }


      const [updatedRowsBookLength] = await Book.update(newData, {
        where: { id: bookId },
      });
  
      if (updatedRowsBookLength === 0) {
        return { success: false, message: "Book to update not found" };
      }
  
      const updatedBook = await Book.findByPk(bookId);
      return {
        success: true,
        message: "Book updated successfully",
        updatedLibrary: updatedBook,
      };
    } catch (error) {
      console.log(`Error updating  library, ${error}`);
      return { success: false, error: error.message }
    }
  };
  
  // ○ Eliminar un libro (**) (AUTH)
  const deleteBook = async (bookId) => {
    try {
      const rowsDeletedBook = await Book.destroy( {
        where: { id: bookId },
      });
  
      if (rowsDeletedBook === 0) {
        return { success: false, message: "Book to delete not found" };
      }
  
      return {
        success: true,
        message: `deleted book with id ${bookId}:  successfully`,
      };
    } catch (error) {
      console.log(`Error deleting  library, ${error}`);
      return {success: false, error: error.message };
    }
  };
  

  module.exports = {
    createBook,
    getBook,
    updateBook,
    deleteBook
  }