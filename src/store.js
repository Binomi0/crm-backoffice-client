import { createStore, combineReducers, applyMiddleware } from 'redux';
import users from './reducers/userReducer';
import items from './reducers/itemReducer';
import clients from './reducers/clientReducer';
import routes from './reducers/routeReducer';
import logger from 'redux-logger';

export default createStore(
    combineReducers({ routes, clients, items, users }),
    applyMiddleware(logger)
);
