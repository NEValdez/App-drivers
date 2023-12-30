import { GET_DRIVERS, GET_DRIVERS_BY_NAME, FILTER_DRIVER_BY_TEAM, FILTER_DRIVER_BY_SOURCE, GET_ALL_TEAMS, GET_DRIVERS_BY_ID } from "./actions"

const initialState = {
    drivers: [],
    slectedDriver: null,
    filteredDrivers: [],
    teams: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRIVERS:
            return { ...state, drivers: [...action.payload], filteredDrivers: [...action.payload] };
        case GET_DRIVERS_BY_NAME:
            return { ...state, selectedDriver: action.payload };
        case FILTER_DRIVER_BY_TEAM:
            return { ...state, filteredDrivers: action.payload };
        case FILTER_DRIVER_BY_SOURCE:
            return { ...state, filteredDrivers: action.payload };
        case GET_DRIVERS_BY_ID:
            return { ...state, driversById: action.payload };
        case GET_ALL_TEAMS:
            return { ...state, teams: action.payload};
        default:
            return { ...state }
    }
}

export default rootReducer;