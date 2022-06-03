import {
    request_encoded_post
} from "./request";
import {
    setSessionCookie
} from "./cookie";

export const handleSigninPost = async function (userEmail, userPassword) {
    var dataToSend = {
        email: userEmail,
        password: userPassword,
    };
    let result = await request_encoded_post(dataToSend, "/api/signin")
    if(result.res != 1){
        return result.res
    }
    let cookie = result.cookie; //TODO store cookie in async storage
    await setSessionCookie(cookie);

    return result.res
};