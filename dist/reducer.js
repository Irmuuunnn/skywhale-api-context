export default function appReducer(state, action) {
    const type = action.type.split("_")[0];
    const model = action.type.split("_")[1];
    switch (type) {
        case "request": {
            state[`is${model}`] = true;
            state[`res${model}`] =
                action.clear === true ? undefined : state[`res${model}`];
            state[`page${model}`] = {};
            return { ...state };
        }
        case "error": {
            state[`err_${model}`] = false;
            state[`is${model}`] = false;
            return { ...state };
        }
        case "response": {
            state[`is${model}`] = false;
            state[`res${model}`] = action.response;
            return { ...state };
        }
        case "setmodel": {
            state[action.model] = action.response;
            return { ...state };
        }
        case "login": {
            return {
                ...state,
                islogin: action.response,
                _auth: action.response
                    ? JSON.parse(localStorage.getItem("auth") || "{}")
                    : undefined,
            };
        }
        default:
            return state;
    }
}
