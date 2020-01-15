const initialState = {
    roverFilters: {
        fetched: false,
        filters: {}
    }
}

export function filterReducer(state=initialState, { type, payload }) {
    switch(type) {
        case "ROVER_FILTER":
            return { ...state, roverFilters: {filters: {...state.roverFilters, ...payload}, fetched: true} }
        default: 
            return {...state}
    }
}