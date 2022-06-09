import {request_get} from "./request";

export const handleGetInfo = async function () {
    return await request_get("/api/info")
};