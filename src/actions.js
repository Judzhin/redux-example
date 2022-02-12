import {ASYNC_INCREMENT, CHANGE_THEME, DECREMENT, INCREMENT} from "./types";

/**
 *
 * @returns {{type: string}}
 */
export function increment() {
    return {type: INCREMENT}
}

/**
 *
 * @returns {{type: string}}
 */
export function asyncIncrement() {
    // return {type: ASYNC_INCREMENT}
    return function (dispatch) {
        // dispatch({type: ASYNC_INCREMENT});
        setTimeout(() => {
            // dispatch({type: ASYNC_INCREMENT});
            dispatch(increment());
        }, 1500);
    }
}

/**
 *
 * @returns {{type: string}}
 */
export function decrement() {
    return {type: DECREMENT}
}

/**
 *
 * @param newTheme
 * @returns {{type: string, payload: *}}
 */
export function changeTheme(newTheme) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}
