const { Router } = require('express');


const driversRouter = Router();

driversRouter.get("/drivers", getDrivers)
console.log("hola");

driversRouter.get("/drivers/:idDriver", getDriversById)

driversRouter.post("/drivers", postDrivers)

driversRouter.get("/teams", getTeams)

module.exports = driversRouter;