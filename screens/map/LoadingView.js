import {StyleSheet, View} from "react-native";
import LottieView from "lottie-react-native";
import React from "react";

const loadingViewStyle = StyleSheet.create({
    loadingView: {
        flex:1,
        position:"absolute",
        left:0,
        right:0,
        bottom:0,
        top:0,
        backgroundColor:'rgba(84, 104, 140, 0.5)',
        alignItems:"center",
        justifyContent:"center"
    }
})

const LoadingView = (props)=>{

    if(props.isLoading) return (
        <View style={
            loadingViewStyle.loadingView
        }>
            <LottieView
                source={require('./../../assets/lottie/loading.json')}
                autoPlay
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'transparent',
                }}
            ></LottieView>
        </View>
    )
    else return null;
}

export {LoadingView}