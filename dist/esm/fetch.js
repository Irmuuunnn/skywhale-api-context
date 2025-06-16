var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
const _request = ({ url, method, body, isfile, nopagination, token, }) => {
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    };
    if (nopagination) {
        const newUrl = new URL(url);
        const params = new URLSearchParams(newUrl.search);
        params.delete("limit");
        params.delete("offset");
        url = `${newUrl.origin}${newUrl.pathname}?${params.toString()}`;
    }
    if (method === "GET") {
        return axios
            .get(url, header)
            .then((response) => response.data)
            .catch((error) => error === null || error === void 0 ? void 0 : error.response);
    }
    if (isfile) {
        const request = new Request(url, {
            method,
            headers: new Headers({ Authorization: header.headers.Authorization }),
            body,
        });
        return fetch(request)
            .then((res) => res.json())
            .catch((error) => error === null || error === void 0 ? void 0 : error.response);
    }
    if (method === "POST") {
        return axios
            .post(url, body, header)
            .then((response) => response.data)
            .catch((error) => error === null || error === void 0 ? void 0 : error.response);
    }
    if (method === "PUT") {
        return axios
            .put(url, body, header)
            .then((response) => response.data)
            .catch((error) => error === null || error === void 0 ? void 0 : error.response);
    }
    if (method === "DELETE") {
        return axios
            .delete(url, header)
            .then((response) => response.data)
            .catch((error) => error === null || error === void 0 ? void 0 : error.response);
    }
    return fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json, text/plain, */*",
            Authorization: header.headers.Authorization,
        },
        credentials: "include",
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .catch((error) => error === null || error === void 0 ? void 0 : error.response);
};
export const fetchRequest = (_a) => __awaiter(void 0, [_a], void 0, function* ({ body, url, method, clear, model, token, dispatchEvent, notification, isfile, nopagination, }) {
    try {
        dispatchEvent({ type: model.request, clear });
        const res = yield _request({
            url,
            method,
            body,
            isfile,
            token,
            nopagination,
        });
        res.status !== true &&
            notification({
                type: "warning",
                message: `${res.data.message}`,
            });
        if (res.status === true) {
            (model.response.includes("update") ||
                model.response.includes("delete") ||
                model.response.includes("create")) &&
                notification({ type: "success", message: res.message });
        }
        dispatchEvent({ type: model.response, response: res, clear });
        return res;
    }
    catch (error) {
        return dispatchEvent({ type: model.error, error: error });
    }
});
