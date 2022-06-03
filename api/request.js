import {
    getSessionCookie
} from "./cookie";

const SERVER_URL = "http://192.168.1.89:3000"

const request_encoded_post = async (data, route) => {
    let d = encode_data(data);
    let path = SERVER_URL + route;
    try {
        let r = await fetch(path, {
            method: "POST",
            body: d,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        let result = await r.json();
        let cookies = get_set_cookies(r.headers);
        if (cookies) {
            result.cookie = cookies[0];
        }
        return result;
    } catch (err) {
        console.log("Error fetching request_encoded_post :  " + err.stack)
    }
}

export const request_get_cookie = async (route) => {
    let path = SERVER_URL + route;
    let cookie = await getSessionCookie();
    let h = new Headers();
    h.append("Cookie", cookie);
    try {
        let r = await fetch(path, {
            method: "GET",
            headers: "cookie :" + cookie
        })
        let result = await r.json();
        return result;
    } catch (err) {
        console.log("Error fetching request_encoded_get :  " + err.stack)
    }
}

export const request_encoded_post_cookie = async (data, route) => {
    let d = encode_data(data);
    let path = SERVER_URL + route;
    let cookie = await getSessionCookie();
    let h = new Headers();
    h.append("cookie", cookie);
    h.append("Content-Type", "application/x-www-form-urlencoded");
    try {
        let r = await fetch(path, {
            method: "POST",
            body: d,
            headers: h
        })
        let result = await r.json();
        return result;
    } catch (err) {
        console.log("Error fetching request_encoded_post :  " + err.stack)
    }
}

const get_set_cookies = function (headers) {
    const set_cookies = []
    for (const [name, value] of headers) {
        if (name === "set-cookie") {
            set_cookies.push(value)
        }
    }
    return set_cookies
}

const encode_data = (dataToSend) => {
    var formBody = [];
    for (var data in dataToSend) {
        var encodedKey = encodeURIComponent(data);
        var encodedValue = encodeURIComponent(dataToSend[data]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}


export {
    request_encoded_post
}