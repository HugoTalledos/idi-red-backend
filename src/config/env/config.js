const { config } = require("dotenv");
const path = require("path");

const pathEnv = path.join(__dirname, "/config.env");

const configDotenv = config({ path: pathEnv });

if (configDotenv.error) {
  console.error(
    `Error: Enviroment variables CAN NOT created. ${configDotenv.error}`
  );
} else {
  console.log("Enviroment variables created successfully!");
}
