import axios from "axios"

export const GET_DRIVERS = "GET_DRIVERS"
export const GET_DRIVERS_BY_NAME = "GET_DRIVERS_BY_NAME"
export const GET_DRIVERS_BY_ID = "GET_DRIVERS_BY_ID"
export const FILTER_DRIVER_BY_TEAM = "FILTER_DRIVER_BY_TEAM"
export const GET_ALL_TEAMS = "GET_ALL_TEAMS"
export const FILTER_DRIVER_BY_SOURCE = "FILTER_DRIVER_BY_SOURCE"

export const getDrivers = (limit, offset) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/drivers?limit=${limit}&offset=${offset}`)
            const driversData = response.data
            const drivers = driversData.map((driver)=>{
                return {
                    name: driver.name,
                    teams: driver.teams,
                    image: driver.image,
                    birthdate: driver.birthdate
                }
            })

        dispatch({
            type: GET_DRIVERS,
            payload: drivers
        })

        } catch(error){
            console.error("Error al obtener los corredores", error)
        }
    }
}

export const getDriverByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/drivers?name=${name}`)
            const driver = response.data;
            dispatch({
                type:GET_DRIVERS_BY_NAME,
                payload: driver,
            })
            return driver;
        } catch (error) {
            console.error("Error al obtener el corredor", error)
        }
    }
}

export const filterDriversByTeam = (team) => {
    return function (dispatch, getState) {
        try {
            const state = getState();
            let filteredDrivers = [];
            if (team === "") {
                filteredDrivers = state.drivers;
            } else {
                filteredDrivers = state.drivers.filter((driver) => {
                    const driverTeams = driver.teams
                    if (!driverTeams) {
                        return false;
                    }
                    return driver.teams.includes(team)})
            }                
            dispatch({
                type:FILTER_DRIVER_BY_TEAM,
                payload: filteredDrivers,
                })
            return filteredDrivers;
        } catch (error) {
            console.error("Error al filtrar por Escuderías", error)
        }
    }
}

export const filterDriversBySource = (source, driversArray) => {
    return function (dispatch) {
        try {
            let filteredDrivers = [];
            if (source === "") {
                filteredDrivers = driversArray;
            } else {
                filteredDrivers = driversArray.filter((drivers) => {
                    if (drivers.source === source) {
                        return true;
                    } else {
                        return false;
                    }
                    
                })
            }
            dispatch({
                type:FILTER_DRIVER_BY_SOURCE,
                payload: filteredDrivers
            })
            return filteredDrivers
        } catch (error) {
            console.error("Error al filtrar por fuente de datos", error)
        }
    }
}

export const getDriversById = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/drivers/${id}`)
            const driversById = response.data
            dispatch({
                type: GET_DRIVERS_BY_ID,
                payload: driversById
            })
        } catch (error) {
            console.error("Error al obtener el corredor", error)
        }
    }
}

export const getAllTeams = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/teams")
            const teams = response.data
            dispatch({
                type: GET_ALL_TEAMS,
                payload: teams
            })
            return teams
        } catch (error) {
            console.error("Error al enlistar las escuderías", error)
        }
    }
}