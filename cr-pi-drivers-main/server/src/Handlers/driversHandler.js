const { searchDriversByName, getAllDrivers, getDriverById, crearDriver, getAllTeams } = require("../Controller/driverController")


const getDriversHandler = async (req, res) => {
    const { name, limit, offset } = req.query;
    const results = name ? await searchDriversByName(name) : await getAllDrivers(limit, offset);
    res.status(200).send(results);
}

const getDriversByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const driver = await getDriverById(id, source);
        res.status(200).json(driver);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postDriversHandler = async (req, res) => {
    try {
        const { name, description, image, nationality, birthdate, teams } = req.body;
        const newDriver = await crearDriver( name, description, image, nationality, birthdate, teams)
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getTeamsHandler = async (req, res) => {
    try {
        const allTeams = await getAllTeams();
        res.status(200).json(allTeams);
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getDriversHandler,
    getDriversByIdHandler,
    postDriversHandler,
    getTeamsHandler
}