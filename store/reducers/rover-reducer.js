const initialState = {
    rovers: []
}

export function roverReducer(state=initialState, { type, payload }) {
    switch(type) {
        case "GET_ROVERS":
            return { ...state, rovers: payload }
        default: 
            return {...state}
    }
}