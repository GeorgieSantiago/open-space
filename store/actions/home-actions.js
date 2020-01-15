import { store } from '../store'

export const getApod = ({data}) => (store.dispatch({
        type: "GET_APOD",
        payload: data
}))