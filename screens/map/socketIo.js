import io from 'socket.io-client';
import React, { useEffect } from 'react';
import {View} from "react-native";

const SOCKET_URL = "http://localhost:3001"

const Socket =  ()=>{

    const socket = io(SOCKET_URL);
    socket.connect()
    socket.on("connect", ()=>{
        console.log("socket", socket.connected)
    })

    useEffect(()=>{



    })

    return (<View></View>)

}

export default Socket