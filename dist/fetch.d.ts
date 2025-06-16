interface IFetchRequest {
    body: any;
    url: string;
    method: string;
    clear: boolean;
    model: any;
    dispatchEvent: any;
    notification: any;
    isfile: boolean;
    token: string;
    nopagination: boolean;
}
export declare const fetchRequest: ({ body, url, method, clear, model, token, dispatchEvent, notification, isfile, nopagination, }: IFetchRequest) => Promise<any>;
export {};
