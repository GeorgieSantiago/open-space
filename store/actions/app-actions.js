import { store } from '../store'

export const loading = (mode) => (store.dispatch({
    type: "LOADING",
    payload: mode
}))

export const error = (message) => (store.dispatch({
    type: "ERROR",
    payload: message
}))