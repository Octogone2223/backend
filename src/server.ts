import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import rateLimit from "express-rate-limit";

const morgan = require("morgan");
const cors = require("cors");

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Constants
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: [
    "http://localhost:4200",
    process.env.NODE_ENV === "production"
      ? process.env.ALLOW_ORIGIN_PROD
      : "http://localhost:4200",
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
      {
        url: "https://octogone-waste.herokuapp.com",
      },
    ],
  },
  apis: ["src/routes/waste.routes.ts", "src/routes/auth.routes.ts"],
};

const specs = swaggerJsdoc(options);

// App
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(limiter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Routes
require("./routes/waste.routes")(app);
require("./routes/auth.routes")(app);

// Connect to MongoDB
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME || "dev";
const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.sguejvt.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(PORT, () =>
      console.log("\x1b[33m%s\x1b[0m", `Server listen on port : ${PORT} ????`)
    );
  })
  .catch((err) => console.log(err));
