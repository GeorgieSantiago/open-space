import { store } from '../store'

export const loading = (mode) => (store.dispatch({
    key: "LOADING",
    payload: mode
}))