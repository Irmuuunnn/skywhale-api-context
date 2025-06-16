export interface UserInfo {
    token?: string;
    [key: string]: any;
  }
  
  export interface GlobalState {
    lang: string;
    token?: string;
    userToken?: string;
    [key: string]: any;
  }
  
  export interface ModelInfo {
    request: string;
    response: string;
    error: string;
  }
  
  export interface Models {
    [key: string]: ModelInfo;
  }
  
  export interface RequestParams {
    url: string;
    model?: string;
    body?: any;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    clear?: boolean;
    isfile?: any;
    ismessage?: boolean;
    API?: string;
    nopagination?: boolean;
  }
  
  export interface NotificationParams {
    type: "success" | "error" | "warning" | "info";
    message?: string | null;
    data?: any;
    description?: string;
  }
  
  export interface SetModelParams {
    model: string;
    res: any;
  }
  
  export interface GlobalContextType extends GlobalState {
    request: (params: RequestParams) => Promise<any>;
    setlogin: (login: UserInfo) => void;
    notification: (params: NotificationParams) => void;
    setModel: (params: SetModelParams) => void;
  }
  
  export interface GlobalProviderProps {
    children: React.ReactNode;
    apiUrl?: string;
    initialState?: Partial<GlobalState>;
  }