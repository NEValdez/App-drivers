const { Router } = require('express');
const { getDriversHandler, getDriversByIdHandler, postDriversHandler, getTeamsHandler } = require("../Handlers/driversHandler")

const driversRouter = Router();

driversRouter.get("/drivers", getDriversHandler)

driversRouter.get("/drivers/:idDriver", getDriversByIdHandler)

driversRouter.post("/drivers", postDriversHandler)

driversRouter.get("/teams", getTeamsHandler)

module.exports = driversRouter;