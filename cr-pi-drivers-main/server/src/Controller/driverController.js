const { Driver } = require("../db")

const getAllDrivers = async () => {
    const dataBaseDrivers = await Driver.findAll();

    const apiDriversRaw = await axios.get("localhost:5000/drivers")

    const apiDrivers = clean(apiDriversRaw)

    return [...dataBaseDrivers, ...apiDrivers];
}

const getDriverById = async (id, source) => {
    const driver = 
        source === "api"
            ? (await axios.get(`localhost:5000/drivers/${id}`))
            : await Pokemon.findByPk(id);
        return driver;
}

const searchDriversByName = async (name) => {
    const dataBaseDriversByName = await Driver.findAll({where: { name: name }})

    const apiDriverByName = await axios.get(`localhost:5000/drivers/${name}`)

    return [...dataBaseDriversByName, ...apiDriverByName];
}

const crearDriver = async (id, name, surname, description, image, nacionality, birthdate) => {
    await Driver.create({id, name, surname, description, image, nacionality, birthdate})
}

module.exports = {
    getAllDrivers,
    getDriverById,
    searchDriversByName,
    crearDriver
}