const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config/config.json");
const corsOptions = config.corsOptions;
const Sequelize = require("sequelize");
const { dbName, dbConfig } = require("./config/config.json");
require("dotenv").config();

app.use(cors(corsOptions));

module.exports = db = {};

initialize();

app.use(express.json());

async function initialize() {
    const dialect = "mssql";
    const host = dbConfig.server;
    const userName = process.env.Name;
    const password = process.env.password;

    let sequelize;
    let connected = false;
    let retries = 0;
    const maxRetries = 5;
    const retryInterval = 3000;

    while (!connected && retries < maxRetries) {
        try {
            sequelize = new Sequelize(dbName, userName, password, { host, dialect });
            connected = true;
        } catch (error) {
            console.error(`Database connection error: ${error.message}`);
            retries++;
            await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }
    }

    if (!connected) {
        console.error(
            `Failed to establish a connection to the database after ${maxRetries} attempts. Exiting the process.`
        );
        process.exit(1);
    }

    db.Dog = require("./models/Dog")(sequelize);

    await sequelize.sync({ alter: true });
}

const dogroutes = require("./routes/dog");

app.get("/ping", (req, res) => {
    res.json({ message: "Dogshouseservice.Version1.0.1" });
});
app.use("", dogroutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
