const {Library} = require("../models")


const createLibrary = async (library) => {
    try {
      const newLibrary = await Library.create(library);
      return newLibrary;
    } catch (error) {
      console.log(`Error when creating User, ${error}`);
      return { error: error.message };
    }
  };
  


  module.exports ={
    createLibrary
  }