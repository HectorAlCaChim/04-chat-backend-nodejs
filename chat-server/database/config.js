const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        mongoose.connect(process.env.MONGODB)
        console.log('db online')
    } catch (error) {
        console.log(error);
        throw new Error('Error database conection')
    }
}
module.exports = {
    dbConnection
}