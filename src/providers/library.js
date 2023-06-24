const {Library, Book} = require("../models")


const createLibrary = async (library) => {
    try {
      const newLibrary = await Library.create(library);
      return newLibrary;
    } catch (error) {
      console.log(`Error when creating library, ${error}`);
      return { error: error.message };
    }
  };
  


  const getLibrary = async (libraryId) => {
    try {
      if(!libraryId){
        const librariesFound = await Library.findAll( { include: {all: true} });
        return librariesFound;
      }
      const libraryFound = await Library.findByPk(libraryId,  { include: {all: true} });
      return libraryFound;
    } catch (error) {
      console.log(`Error looking for library, ${error}`);
      return { error: error.message };
    }
  };
  


  module.exports ={
    createLibrary,
    getLibrary

  }