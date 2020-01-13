import { store } from '../store'

export const getRovers = (data) => (store.dispatch({
    key: "GET_ROVERS",
    payload: data
}))