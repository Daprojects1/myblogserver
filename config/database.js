const mongoose = require('mongoose')

const { MONGO_URI } = process.env

// console.log(require('crypto').randomBytes(64).toString('hex'))
const connect = async () => {
    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to database");
          })
          .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
          });
}


module.exports = connect