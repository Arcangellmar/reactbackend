import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(3001, () => console.log("Server running on port 3001"));