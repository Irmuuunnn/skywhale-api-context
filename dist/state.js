import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useReducer } from "react";
import { fetchRequest } from "./fetch";
import appReducer from "./reducer";
import * as Ant from "antd";
const models = {};
export const GlobalContext = createContext(undefined);
export const GlobalProvider = ({ children, apiUrl = "", initialState = {}, ...props }) => {
    const defaultState = {
        userToken: localStorage.getItem("token") ?? '',
        lang: "mn",
        ...initialState,
    };
    const [state, dispatch] = useReducer(appReducer, defaultState);
    const addmodel = ({ model }) => {
        models[model] = {
            request: `request_${model}`,
            response: `response_${model}`,
            error: `error_${model}`,
        };
    };
    const request = async ({ url, model, body, method = "GET", clear = false, isfile, ismessage = false, API = apiUrl, nopagination = false, }) => {
        try {
            addmodel({ model: model || url });
            let requestBody = body;
            if (isfile && body) {
                const form = new FormData();
                Object.keys(body).forEach((keyname) => form.append(keyname, body[keyname] !== undefined ? body[keyname] : ""));
                requestBody = form;
            }
            const res = await fetchRequest({
                url: API + url,
                method,
                body: requestBody,
                clear,
                model: models[model || url],
                dispatchEvent: dispatch,
                notification: notification,
                isfile: isfile,
                token: state.userToken,
                nopagination,
            });
            if (ismessage && res.status === true) {
                notification({ ...res, type: "success" });
            }
            if (res?.status === 401) {
                localStorage.clear();
                window.location.href = "/login";
            }
            return res;
        }
        catch (error) {
            console.error("Request error:", error);
            throw error;
        }
    };
    const setlogin = (login) => dispatch({ type: "login", response: login });
    const setModel = ({ model, res }) => dispatch({ type: "setmodel", model: model, response: res });
    const notification = ({ type, message, description, }) => {
        if (message === "undefined (undefined)") {
            Ant.notification[type]({
                message: type !== "success" ? "Амжилтгүй" : undefined,
                description: description,
            });
        }
        else {
            Ant.notification[type]({
                message: message !== null
                    ? message
                    : type === "success"
                        ? "Амжилттай"
                        : undefined,
                description: description,
            });
        }
    };
    const contextValue = {
        ...state,
        request,
        setlogin,
        notification,
        setModel,
    };
    return (_jsx(GlobalContext.Provider, { value: contextValue, ...props, children: children }));
};
export const useGlobalContext = () => {
    const context = React.useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
