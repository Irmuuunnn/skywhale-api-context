"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = appReducer;
function appReducer(state, action) {
    const type = action.type.split("_")[0];
    const model = action.type.split("_")[1];
    switch (type) {
        case "request": {
            state[`is${model}`] = true;
            state[`res${model}`] =
                action.clear === true ? undefined : state[`res${model}`];
            state[`page${model}`] = {};
            return Object.assign({}, state);
        }
        case "error": {
            state[`err_${model}`] = false;
            state[`is${model}`] = false;
            return Object.assign({}, state);
        }
        case "response": {
            state[`is${model}`] = false;
            state[`res${model}`] = action.response;
            return Object.assign({}, state);
        }
        case "setmodel": {
            state[action.model] = action.response;
            return Object.assign({}, state);
        }
        case "login": {
            return Object.assign(Object.assign({}, state), { islogin: action.response, _auth: action.response
                    ? JSON.parse(localStorage.getItem("auth") || "{}")
                    : undefined });
        }
        default:
            return state;
    }
}
