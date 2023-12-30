const { Driver, Teams } = require("../db")
const axios = require("axios")

const clean = (arr) => 
    arr.map((elem) => {
        if (elem.teams===undefined) {
            return "";
        } 
        const driverTeams = elem.teams.split(",")
        const teamsPolish = driverTeams.map((i) => {
        const croppedTeam = i.trim();
        return croppedTeam
        })

        return {
            id: elem.id,
            name: elem.name.forename + " " + elem.name.surname,
            description: elem.description,
            image: elem.image.url,
            nationality: elem.nationality,
            birthdate: elem.dob,
            teams: teamsPolish,
            source: "api"
        }
    })

const getAllDrivers = async (limit, offset) => {
 
    const dataBaseDrivers = await Driver.findAll();
    
    const apiDriversRaw = await axios.get(`http://localhost:5000/drivers`)
    
    const aux = apiDriversRaw.data
    
    const apiDrivers = clean(aux)
    console.log(dataBaseDrivers);
    return [...dataBaseDrivers, ...apiDrivers];
}

const getDriverById = async (id, source) => {
    const driver = 
        source === "api"
            ? (await axios.get(`http://localhost:5000/drivers/${id}`)).results
            : await Driver.findByPk(id);
        return driver;
}

const searchDriversByName = async (name) => {
    const dataBaseDriversByName = await Driver.findAll({where: { name: name }})

    const apiDriver = await axios.get(`http://localhost:5000/drivers/?name.forename=${name}`)
    apiDriverByNameRaw = apiDriver.data;
    apiDriverByName = clean(apiDriverByNameRaw)
    const results = [...dataBaseDriversByName, ...apiDriverByName]
    return results[0];
}

const crearDriver = async ( name, description, image, nationality, birthdate, teams ) => {
        await Driver.create({ name, description, image, nationality, birthdate, teams, source: "bdd"})
}

const getAllTeams = async () => {
    const teams = []
    const allDrivers = await axios.get("http://localhost:5000/drivers")
    const allTeams = allDrivers.data
    allTeams.map((e) => {
        if (e.teams===undefined) {
            return "";
        } 
        const driverTeams = e.teams.split(",")

        driverTeams.map((i) => {
            const croppedTeam = i.trim();
            if (!(teams.includes(croppedTeam))) {
                Teams.create({name: i})
                return teams.push(croppedTeam);
            } else {
                return teams
            }
        })
    })
    return teams;
}

module.exports = {
    getAllDrivers,
    getDriverById,
    searchDriversByName,
    crearDriver,
    getAllTeams
}