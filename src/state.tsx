import React, { createContext, useReducer } from "react";
import { fetchRequest } from "./fetch";
import appReducer from "./reducer";
import * as Ant from "antd";
import {
  GlobalState,
  GlobalContextType,
  GlobalProviderProps,
  UserInfo,
  RequestParams,
  NotificationParams,
  SetModelParams,
  ModelInfo,
  Models,
} from "./types";

const models: Models = {};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({
  children,
  apiUrl = "",
  initialState = {},
  ...props
}) => {
  const defaultState: GlobalState = {
    userToken: localStorage.getItem("token") ?? '',
    lang: "mn",
    ...initialState,
  };

  const [state, dispatch] = useReducer(appReducer, defaultState);

  const addmodel = ({ model }: { model: string }): void => {
    models[model] = {
      request: `request_${model}`,
      response: `response_${model}`,
      error: `error_${model}`,
    };
  };

  const request = async ({
    url,
    model,
    body,
    method = "GET",
    clear = false,
    isfile,
    ismessage = false,
    API = apiUrl,
    nopagination = false,
  }: RequestParams): Promise<any> => {
    try {
      addmodel({ model: model || url });

      let requestBody: any = body;

      if (isfile && body) {
        const form = new FormData();
        Object.keys(body).forEach((keyname) =>
          form.append(keyname, body[keyname] !== undefined ? body[keyname] : "")
        );
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
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  };

  const setlogin = (login: UserInfo): void =>
    dispatch({ type: "login", response: login });

  const setModel = ({ model, res }: SetModelParams): void =>
    dispatch({ type: "setmodel", model: model, response: res });

  const notification = ({
    type,
    message,
    description,
  }: NotificationParams): void => {
    if (message === "undefined (undefined)") {
      Ant.notification[type]({
        message: type !== "success" ? "Амжилтгүй" : undefined,
        description: description,
      });
    } else {
      Ant.notification[type]({
        message:
          message !== null
            ? message
            : type === "success"
            ? "Амжилттай"
            : undefined,
        description: description,
      });
    }
  };

  const contextValue: GlobalContextType = {
    ...state,
    request,
    setlogin,
    notification,
    setModel,
  };

  return (
    <GlobalContext.Provider value={contextValue} {...props}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};