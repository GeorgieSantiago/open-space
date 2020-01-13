import { createStore, combineReducers, compose } from "redux";
import { appReducer } from './reducers/app-reducer'
import { filterReducer } from './reducers/filters-reducer'

/*
import { createBrowserHistory } from 'history';
const middleware = [thunk];
export const history = createBrowserHistory();
const enhancers = compose(...middleware)
*/
/**@var {callback} reducers*/
const reducers = combineReducers({
    appReducer,
    filterReducer
});
/**@var {object} store */
export const store = createStore(reducers, {});
