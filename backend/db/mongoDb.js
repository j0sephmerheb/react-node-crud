const mongoose = require('mongoose');

const mongoDb = {};
var mongoConn = false;
                                          
mongoDb.connect = async () => {
    try {
        mongoConn = await mongoose.connect(process.env.ENV_MONGO_DB_URL, {
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