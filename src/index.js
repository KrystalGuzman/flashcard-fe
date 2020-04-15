import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { flashcardReducer } from './reducers/index';
import thunk from 'redux-thunk';


import './index.css';
import * as serviceWorker from './serviceWorker';
import App from "./components/App";


const middleware = [
    thunk, logger
]
const store = createStore(flashcardReducer, applyMiddleware(...middleware));

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>, document.getElementById('root'));

serviceWorker.unregister();
