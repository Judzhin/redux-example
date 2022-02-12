// import {createStore} from "./createStore";
import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import $ from "jquery"; // const $ = require( "jquery" );
import './style.css';
import {ASYNC_INCREMENT, CHANGE_THEME, DECREMENT, INCREMENT, INITIALIZE} from "./types";
import {asyncIncrement, changeTheme, decrement, increment} from "./actions";

/**
 *
 * @param state
 * @param action
 * @returns {number}
 */
function counterReducer(state = 0, action) {

    if (INCREMENT === action.type) {
        return state + 1;
    }

    // if (ASYNC_INCREMENT === action.type) {
    //     // setTimeout(() => {
    //     //     return state + 1;
    //     // }, 2000);
    //     return state + 1;
    // }

    if (DECREMENT === action.type) {
        return state - 1;
    }

    return state;
}

const initialThemeState = {
    value: 'light'
};

/**
 *
 * @param state
 * @param action
 * @returns {{value: string}}
 */
function themeReducer(state = initialThemeState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload}
        default:
            return state;
    }

}

// /**
//  *
//  * @param rootReducer
//  * @param initialState
//  * @returns {*}
//  */
// function createStore(rootReducer, initialState) {
//
//     let state = rootReducer(initialState, {type: '__INIT__'});
//     let $observer = $({});
//
//     return {
//         /**
//          *
//          * @param callback
//          * @returns {subscribe}
//          */
//         subscribe(callback) {
//             $observer.on('store:dispatch', callback);
//             return this;
//         },
//         /**
//          *
//          * @param action === { type: 'SOME_ACTION_NAME' }
//          * @returns {dispatch}
//          */
//         dispatch(action) {
//             state = rootReducer(state, action);
//             $observer.trigger('store:dispatch', [$observer]);
//             return this;
//         },
//         /**
//          *
//          * @returns {*}
//          */
//         getState() {
//             return state;
//         }
//     };
// }

// /**
//  * Custom Middleware
//  *
//  * @param state
//  * @returns {function(*): function(*=): *}
//  */
// function logger(state) {
//     return function (next) {
//         return function (action) {
//             // console.log('State:', state);
//             // console.log('Action:', action);
//             // return next(action);
//             console.log('Prev State:', state);
//             console.log('Action:', action);
//             const newState = next(action);
//             console.log('Next State:', newState);
//             return newState;
//         }
//     }
// }

const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer
});

// const store = createStore(rootReducer, 0);
const store = createStore(rootReducer, applyMiddleware(thunk, logger));
window.store = store;

$('#add').on('click', function () {
    // store.dispatch({type: INCREMENT});
    store.dispatch(increment());
});

$('#sub').on('click', function () {
    // store.dispatch({type: DECREMENT});
    store.dispatch(decrement());
});

$('#async').on('click', function () {
    // setTimeout(() => {
    //     store.dispatch(increment());
    // }, 2000);
    store.dispatch(asyncIncrement())
});

$('#theme').on('click', function () {
    const newTheme = $('body').hasClass('light') ? 'dark' : 'light';
    store.dispatch(changeTheme(newTheme))
});

const $body = $('body');

// store.subscribe(() => console.log(store.getState()));
store.subscribe(() => {
    const state = store.getState();
    $('#counter').html(state.counter);
    $body.removeClass(['light', 'dark']);
    $body.addClass(state.theme.value);
});

store.dispatch({type: INITIALIZE});