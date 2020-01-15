import { store } from '../store'

export const getRoverFilters = ({data}) => (store.dispatch({
        type: "ROVER_FILTER",
        payload: data
}))