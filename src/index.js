import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'




import {createStore,applyMiddleware,compose, combineReducers} from 'redux'
import burgerBuilderReducer from './store/reducer/burgerBuilderReducer'
import orderReducer from './store/reducer/orderReducer'
import authReducer from './store/reducer/authReducer'
import {watchAuth} from './store/sagas/indexSaga'
import {watchBurger} from './store/sagas/indexSaga'

const rootReducer = {
    burgerBuilder: burgerBuilderReducer,
    order:orderReducer,
    auth:authReducer
}

const composeEnhancers = process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = createSagaMiddleware()

const store = createStore(combineReducers(rootReducer), 
                            composeEnhancers(applyMiddleware(thunk,sagaMiddleware)))


sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurger)

const app =(
    <Provider store={store}>
        <BrowserRouter >
            <App/>
        </BrowserRouter>
    </Provider>
    )



ReactDOM.render(app, document.getElementById('root'));
