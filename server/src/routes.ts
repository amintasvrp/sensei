import express from "express";

import ClassController from "./controllers/ClassController";
import ConnectionController from "./controllers/ConnectionController";

const routes = express.Router();
const classesControllers = new ClassController();
const connectionController = new ConnectionController();

routes.get("/classes", classesControllers.index);
routes.post("/classes", classesControllers.create);

routes.get("/connections", connectionController.index);
routes.post("/connections", connectionController.create);

export default routes;
