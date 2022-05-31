import {
    request_encoded_post
} from "./request";

export const handleReportPost = async function (
    desc,
    level,
    location_lat,
    location_long,
    tag_id
) {

    var dataToSend = {
        desc: desc,
        level: level,
        location_lat: location_lat,
        location_long: location_long,
        tag_id: tag_id,
    };

    let result = await request_encoded_post(dataToSend, "/api/report")
    return result.res
};


export const handleReportImagePost = async function (
    image,
    report_id
) {
    var dataToSend = {
        image: image,
        report_id: report_id
    }

    let result = await request_encoded_post(dataToSend, "/api/report/image/")
    return result.res

}