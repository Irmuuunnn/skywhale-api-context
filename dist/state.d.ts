import React from "react";
import { GlobalContextType, GlobalProviderProps } from "./types";
export declare const GlobalContext: React.Context<GlobalContextType | undefined>;
export declare const GlobalProvider: React.FC<GlobalProviderProps>;
export declare const useGlobalContext: () => GlobalContextType;
