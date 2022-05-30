import {
    request_encoded_post
} from "./request";

export const handleSigninPost = async function (userEmail, userPassword) {

    var dataToSend = {
        email: userEmail,
        password: userPassword,
    };

    let result = await request_encoded_post(dataToSend, "/api/signin")

    let cookies = result.cookie; //TODO store cookie in async storage

    return result.res
};