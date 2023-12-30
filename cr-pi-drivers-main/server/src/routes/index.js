const { Router } = require("express");
const driversRouter = require("./driversRouter")

const router = Router();

router.use("/", driversRouter)

module.exports = router;
