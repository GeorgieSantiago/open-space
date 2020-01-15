import { createStore, combineReducers, compose } from "redux";
import { appReducer } from './reducers/app-reducer'
import { filterReducer } from './reducers/filters-reducer'
import { roverReducer } from './reducers/rover-reducer'
import { homeReducer } from './reducers/home-reducer'

/*
import { createBrowserHistory } from 'history';
const middleware = [thunk];
export const history = createBrowserHistory();
const enhancers = compose(...middleware)
*/
/**@var {callback} reducers*/
const reducers = combineReducers({
    appReducer,
    filterReducer,
    roverReducer,
    homeReducer
});
/**@var {object} store */
export const store = createStore(reducers, {});
