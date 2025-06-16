"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalContext = exports.GlobalProvider = exports.GlobalContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const fetch_1 = require("./fetch");
const reducer_1 = __importDefault(require("./reducer"));
const Ant = __importStar(require("antd"));
const models = {};
exports.GlobalContext = (0, react_1.createContext)(undefined);
const GlobalProvider = (_a) => {
    var _b;
    var { children, apiUrl = "", initialState = {} } = _a, props = __rest(_a, ["children", "apiUrl", "initialState"]);
    const defaultState = Object.assign({ userToken: (_b = localStorage.getItem("token")) !== null && _b !== void 0 ? _b : '', lang: "mn" }, initialState);
    const [state, dispatch] = (0, react_1.useReducer)(reducer_1.default, defaultState);
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
            const res = yield (0, fetch_1.fetchRequest)({
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
    return ((0, jsx_runtime_1.jsx)(exports.GlobalContext.Provider, Object.assign({ value: contextValue }, props, { children: children })));
};
exports.GlobalProvider = GlobalProvider;
const useGlobalContext = () => {
    const context = react_1.default.useContext(exports.GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
exports.useGlobalContext = useGlobalContext;
