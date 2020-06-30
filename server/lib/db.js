const mongoose = require("mongoose");
const chalk = require("chalk");

const log = console.log;

mongoose
    .connect(
        `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongo`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGODB_DBNAME,
        }
    )
    .then(() => log(chalk.bgGreen("Connected to MongoDB ✅")))
    .catch((e) => console.log(e));

module.exports = mongoose.connection;
