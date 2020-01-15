import { store } from '../store'

const { dispatch } = store

export const getRovers = ({data}) => (dispatch({
    type: "GET_ROVERS",
    payload: data
}))