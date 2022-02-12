import $ from "jquery";

/**
 *
 * @param rootReducer
 * @param initialState
 * @returns {*}
 */
export function createStore(rootReducer, initialState) {

    let state = rootReducer(initialState, {type: '__INIT__'});
    let $observer = $({});

    return {
        /**
         *
         * @param callback
         * @returns {subscribe}
         */
        subscribe(callback) {
            $observer.on('store:dispatch', callback);
            return this;
        },
        /**
         *
         * @param action === { type: 'SOME_ACTION_NAME' }
         * @returns {dispatch}
         */
        dispatch(action) {
            state = rootReducer(state, action);
            $observer.trigger('store:dispatch', [$observer]);
            return this;
        },
        /**
         *
         * @returns {*}
         */
        getState() {
            return state;
        }
    };
}