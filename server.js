const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const statsRoutes = require("./routes/stats");
const {healthRoutes,matchesRoutes,standingsRoutes,teamsRoutes} = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/matches", matchesRoutes);
app.use("/standings", standingsRoutes);
app.use("/stats", statsRoutes);
app.use("/teams", teamsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server running on port 8000");
});
