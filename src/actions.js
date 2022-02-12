import {ASYNC_INCREMENT, CHANGE_THEME, DECREMENT, INCREMENT, TOGGLE_DISABLE} from "./types";

/**
 *
 * @param disabled
 * @returns {{type: string, payload: *}}
 */
export function toggleDisabled(disabled) {
    return {
        type: TOGGLE_DISABLE,
        payload: disabled
    }
}

/**
 *
 * @returns {{type: string, payload: *}}
 */
function setDisabled () {
    return toggleDisabled(true);
}

/**
 *
 * @returns {{type: string, payload: *}}
 */
function unsetDisabled () {
    return toggleDisabled(false);
}

/**
 *
 * @returns {{type: string}}
 */
export function increment() {
    return {type: INCREMENT}
}

/**
 *
 * @returns {Function}
 */
export function asyncIncrement() {
    // return {type: ASYNC_INCREMENT}
    return function (dispatch) {
        // dispatch({type: ASYNC_INCREMENT});
        // dispatch(toggleDisabled(true));
        dispatch(setDisabled());
        setTimeout(() => {
            // dispatch({type: ASYNC_INCREMENT});
            // dispatch(toggleDisabled(false));
            dispatch(unsetDisabled());
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
