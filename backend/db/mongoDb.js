const mongoose = require('mongoose');

const mongoDb = {};
var mongoConn = false;
                                          
mongoDb.connect = async () => {
    try {
        mongoConn = await mongoose.connect('mongodb+srv://admin:lCr5SiR7yAjGtNLo@movies.bwawn.mongodb.net/movies?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log(`MongoDB connected: ${mongoConn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

mongoDb.close = () => {
    mongoose.connection.close();
}

module.exports = mongoDb;