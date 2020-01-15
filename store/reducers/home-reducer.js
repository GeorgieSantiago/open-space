const initialState = {
    apod: {}
}

export function homeReducer(state=initialState, { type, payload }) {
    switch(type) {
        case "GET_APOD":
            return { ...state, apod: payload }
        default: 
            return {...state}
    }
}