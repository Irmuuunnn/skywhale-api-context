var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useReducer } from "react";
import { fetchRequest } from "./fetch";
import appReducer from "./reducer";
import * as Ant from "antd";
const models = {};
export const GlobalContext = createContext(undefined);
export const GlobalProvider = (_a) => {
    var _b;
    var { children, apiUrl = "", initialState = {} } = _a, props = __rest(_a, ["children", "apiUrl", "initialState"]);
    const defaultState = Object.assign({ userToken: (_b = localStorage.getItem("token")) !== null && _b !== void 0 ? _b : '', lang: "mn" }, initialState);
    const [state, dispatch] = useReducer(appReducer, defaultState);
    const addmodel = ({ model }) => {
        models[model] = {
            request: `request_${model}`,
            response: `response_${model}`,
            error: `error_${model}`,
        };
    };
    const request = (_a) => __awaiter(void 0, [_a], void 0, function* ({ url, model, body, method = "GET", clear = false, isfile, ismessage = false, API = apiUrl, nopagination = false, }) {
        try {
            addmodel({ model: model || url });
            let requestBody = body;
            if (isfile && body) {
                const form = new FormData();
                Object.keys(body).forEach((keyname) => form.append(keyname, body[keyname] !== undefined ? body[keyname] : ""));
                requestBody = form;
            }
            const res = yield fetchRequest({
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
                notification(Object.assign(Object.assign({}, res), { type: "success" }));
            }
            if ((res === null || res === void 0 ? void 0 : res.status) === 401) {
                localStorage.clear();
                window.location.href = "/login";
            }
            return res;
        }
        catch (error) {
            console.error("Request error:", error);
            throw error;
        }
    });
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
    const contextValue = Object.assign(Object.assign({}, state), { request,
        setlogin,
        notification,
        setModel });
    return (_jsx(GlobalContext.Provider, Object.assign({ value: contextValue }, props, { children: children })));
};
export const useGlobalContext = () => {
    const context = React.useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
