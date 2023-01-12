import { join as joinPaths } from "path";
import Express from "express";
import { addMiddleware } from "./middleware";
import { config as loadEnvVars } from "dotenv";
import { adminRoutes } from "./domains/admin";
import { medicRouter } from "./routes/medic";
import { noAuthRoutes, patientRouter } from "./routes";

process.on("unhandledRejection", (err) => {
  console.log("An unhandled exception occurred!", err);
});

loadEnvVars({
  path: joinPaths(__dirname, "../.env"),
});

const PORT = process.env.PORT || 4000;

const app = Express();

addMiddleware(app);

// TODO: secure /admin routes
app.use("/admin", adminRoutes.router);
app.use("/medic", medicRouter);
app.use("/no-auth", noAuthRoutes);
app.use("/patients", patientRouter);

app.use("", (_, res) => {
  res.status(404).send("You are lost :(");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
