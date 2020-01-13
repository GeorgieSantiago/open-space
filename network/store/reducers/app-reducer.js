const initialState = {
    loading: false,
    error: false,
}

export function appReducer(state=initialState, { type, payload }) {
    switch(type) {
        case "LOADING":
            return { ...state, loading: payload }
        case "ERROR": 
            return { ...state, error: payload, loading: false }
        default: 
            return {...state}
    }
}