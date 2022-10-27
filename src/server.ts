import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const morgan = require("morgan");
const cors = require("cors");

// Constants
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: [
    process.env.NODE_ENV === "production"
      ? process.env.ALLOW_ORIGIN_PROD
      : "http://127.0.0.1:3000",
  ],
  credentials: true,
};

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OCTOGONE API",
      version: "1.0.0",
      description: "OCTOGONE api documentation",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/user.routes.ts", "./routes/waste.routes.ts"],
};

const specs = swaggerJsdoc(options);

// App
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
// Routes
require("./routes/user.routes")(app);
require("./routes/waste.routes")(app);

// Connect to MongoDB
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.sguejvt.mongodb.net/dev?retryWrites=true&w=majority`;
console.log(dbURI);
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(PORT, () =>
      console.log("\x1b[33m%s\x1b[0m", `Server listen on port : ${PORT} 🚀`)
    );
  })
  .catch((err) => console.log(err));
