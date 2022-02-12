// import {createStore} from "./createStore";
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import $ from "jquery"; // const $ = require( "jquery" );
import './style.css';
import {ASYNC_INCREMENT, CHANGE_THEME, DECREMENT, INCREMENT, INITIALIZE, TOGGLE_DISABLE} from "./types";
import {asyncIncrement, changeTheme, decrement, increment, toggleDisabled} from "./actions";

const initialDisabledState = {
    value: false
};


/**
 *
 * @param state
 * @param action
 * @returns {{value: boolean}}
 */
function disabledReducer(state = initialDisabledState, action) {
    switch (action.type) {
        case TOGGLE_DISABLE:
            return {...state, value: action.payload}
            break;
        default:
            return state;
    }
    return state;
}

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
    disabled: disabledReducer,
    counter: counterReducer,
    theme: themeReducer
});

// const store = createStore(rootReducer, 0);
// const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const store = createStore(rootReducer,
    // compose(
    //     applyMiddleware(thunk, logger),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);
window.store = store;

const $add = $('#add').on('click', function () {
    // store.dispatch({type: INCREMENT});
    store.dispatch(increment());
});

const $sub = $('#sub').on('click', function () {
    // store.dispatch({type: DECREMENT});
    store.dispatch(decrement());
});

const $async = $('#async').on('click', function () {
    // setTimeout(() => {
    //     store.dispatch(increment());
    // }, 2000);
    // store.dispatch();
    store.dispatch(asyncIncrement());
});

const $theme = $('#theme').on('click', function () {
    const newTheme = $('body').hasClass('light') ? 'dark' : 'light';
    store.dispatch(changeTheme(newTheme))
});

const $body = $('body');

// store.subscribe(() => console.log(store.getState()));
store.subscribe(() => {
    const state = store.getState();
    $('#counter').html(state.counter);

    $.each([$add, $sub, $async, $theme], function (i, $bttn) {
        $bttn.attr('disabled', state.disabled.value);
    });

    $body.removeClass(['light', 'dark']);
    $body.addClass(state.theme.value);
});

store.dispatch({type: INITIALIZE});