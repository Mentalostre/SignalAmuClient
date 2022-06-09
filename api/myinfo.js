import {
    request_get
} from "./request";

export const handleGetMyInfo = async function () {

    let result = await request_get("/api/myinfo")

    return result.data
};
