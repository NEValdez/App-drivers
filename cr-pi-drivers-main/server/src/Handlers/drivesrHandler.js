const { searchDriversByName, getAllDrivers, getDriverById, crearDriver } = require("../Controller/driverController")

const getDriversHandler = async (req, res) => {
    const { name } = req.query;

    const results = name ? searchDriversByName(name) : await getAllDrivers;

    res.status(200).send(results);
}

const getDriversByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const driver = await getDriverById(id, source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postDrivers = async (req, res) => {
    try {
        const { id, name, surname, description, image, nacionality, birthdate } = req.body;
        const newDriver = await crearDriver(id, name, surname, description, image, nacionality, birthdate)
        res.status(201).json(newDriver);
    } catch {
        res.status(400).json({error: error.message});
    }
}

const getTeams = async (req, res) => {
    try {
        const allTeams = await getAllTeams();
        res.status(200).json(allTeams);
    } catch {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getDriversHandler,
    getDriversByIdHandler,
    postDrivers,
    getTeams
}