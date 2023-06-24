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
  


  const getOneLibrary = async (libraryId) => {
    try {
      const libraryFound = await Library.findByPk(libraryId,  { include: {all: true} });
      return libraryFound;
    } catch (error) {
      console.log(`Error looking for library, ${error}`);
      return { error: error.message };
    }
  };
  


  module.exports ={
    createLibrary,
    getOneLibrary

  }