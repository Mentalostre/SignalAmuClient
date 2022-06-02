import {
    request_get_cookie
} from "./request";

export const handleGetInfo = async function () {

    let result = await request_get_cookie("/api/info")

    return result
};