import {
    request_encoded_post,
    request_encoded_post_cookie, request_get_cookie, request_post_image
} from "./request";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { EventRegister } from 'react-native-event-listeners'


export const handleReportPost = async function (
    desc,
    level,
    location_lat,
    location_long,
    tag_name,
    imagePath
) {
    let dataToSend = {
        desc: desc,
        level: level,
        location_lat: location_lat,
        location_long: location_long,
        tag_name: tag_name,
    };
    let result = await request_encoded_post(dataToSend, "/api/report")
    if(!(result.res ===1)){
        return -1;
    }
    let lastId = result.lastId;
    if(imagePath!=null){
        result = await request_post_image(imagePath, lastId)
        if(!(result.res ===1)){
            return -1;
        }
    }

    //await reloadMapReport()
    return 1
};


const getAllReport = async ()=>{
    let result = await request_get_cookie("/api/report");
    let reports = null;
    if(result.res === 1){
        reports = result.reports;
    }
    if(!reports) {
        return null;
    }
    else
    {
        return reports;
    }
}

export const reloadMapReport = async()=>{
    let reports = await getAllReport();
    let reportString = await asyncStorage.setItem('report', JSON.stringify(reports))
    EventRegister.emit('report', reports);
}

export const reloadMapReportStorage = async()=>{
    let reports = await getAllReport();
    await asyncStorage.setItem('report', JSON.stringify(reports))
}

export const getReport = async(id)=>{
    let reportString = await asyncStorage.getItem('report');
    let report = (JSON.parse(reportString));
    for(let i = 0; i<report.length; i++){
        if(report[i].id == id){
            return report[i];
        }
    }
    return null;
}



export const setReportInAsyncStorage = async()=>{
    console.log("allo")
    await reloadMapReport()
}



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