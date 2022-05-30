import {
    request_encoded_post
} from "./request";


export const handleSignupPost = async function (userEmail, userPassword) {
    var dataToSend = {
        email: userEmail,
        password: userPassword,
    };
    let result = await request_encoded_post(dataToSend, "/api/signup")
    return result.res;
};