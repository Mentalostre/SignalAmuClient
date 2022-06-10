import {Image, View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput} from "react-native";
import React, {useState, useEffect} from "react";
import Modal from "react-native-modal";
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';


import {handleGetMyInfo} from "../api/myinfo";

const upperCaseFirstLetter = (str) => {
    let result;
    str ? result = str.charAt(0).toUpperCase() + str.slice(1) : null
    return result
}

const SettingsScreen = ({navigation}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [consumerID, setConsumerID] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [infoDesc, setInfoDesc] = useState(null)
    const [infoEmail, setInfoEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [data, setData] = useState(null)


    const setInfo = (json) => {
        setConsumerID(json.consumer_id)
        setFirstName(json.first_name)
        setLastName(json.last_name)
        setInfoDesc(json.info_desc)
        setInfoEmail(json.info_email)
        setPhone(json.tel)
    }

    const [isPhoneEdited, setIsPhoneEdited] = useState(false);
    const [isDescEdited, setIsDescEdited] = useState(false);
    const [isEmailEdited, setIsEmailEdited] = useState(false);

    const [temporaryPhone, setTemporaryPhone] = useState(null);
    const [temporaryEmail, setTemporaryEmail] = useState(null);
    const [temporaryDesc, setTemporaryDesc] = useState(null);



    const toggleEdit = (setSetting, setting) => {
        setSetting(!setting)
    }


    const getInfo = async () => {
        try {
            const json = await handleGetMyInfo();
            setInfo(json);
            setData(json)
        } catch (e) {
            console.log("error : ", e);
        }
    };

    const checkPhoneNumber = (phoneNumber) => {
        return (/^(\+33)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(phoneNumber))
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <View style={styles.mainArea}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Paramètres</Text>
                <Text
                    style={styles.welcome}>{"Bienvenue " + upperCaseFirstLetter(firstName) + " " + upperCaseFirstLetter(lastName) + ","}</Text>
            </View>
            <View>
                {
                    consumerID ? <>
                        {
                            isPhoneEdited ? <><View>
                                    <TextInput style={styles.textInputStyle}
                                               textAlign={"left"}
                                               textAlignVertical={"top"}
                                               multiline={true}
                                               placeholder={phone}
                                               onChangeText={(newPhone) => setTemporaryPhone(newPhone)}
                                               maxLength={12}
                                    />
                                    <TouchableOpacity style={styles.cancelButton} onPress={() => {
                                        toggleEdit(setIsPhoneEdited, isPhoneEdited)
                                    }}>
                                        <MaterialCommunityIcons name="cancel" size={24} color="#B20600" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.editButton} onPress={() => {
                                        toggleEdit(setIsPhoneEdited, isPhoneEdited)
                                        console.log(data)
                                        console.log(data)
                                        console.log(checkPhoneNumber(temporaryPhone))
                                    }}>
                                        <AntDesign name="check" size={24} color="#0066CC"/>
                                    </TouchableOpacity>
                                </View>
                                </>
                                : <><View><Text style={styles.boxText}>{phone}</Text>
                                    <TouchableOpacity style={styles.editButton} onPress={() => {
                                        toggleEdit(setIsPhoneEdited, isPhoneEdited)
                                    }}>
                                        <MaterialCommunityIcons name="pencil-outline" size={24} color="#0066CC"/>
                                    </TouchableOpacity>
                                </View></>
                        }

                        {
                            isEmailEdited ? <><View>
                                        <TextInput style={styles.textInputStyle}
                                                   textAlign={"left"}
                                                   textAlignVertical={"top"}
                                                   multiline={true}
                                                   placeholder={infoEmail}
                                                   onChangeText={(newEmail) => setTemporaryEmail(newEmail)}
                                        />
                                    <TouchableOpacity style={styles.cancelButton} onPress={() => {
                                        toggleEdit(setIsEmailEdited, isEmailEdited)
                                    }}>
                                        <MaterialCommunityIcons name="cancel" size={24} color="#B20600" />
                                    </TouchableOpacity>
                                        <TouchableOpacity style={styles.editButton} onPress={() => {
                                            toggleEdit(setIsEmailEdited, isEmailEdited)
                                            data.info_email = temporaryEmail
                                            console.log(data)
                                        }}>
                                            <AntDesign name="check" size={24} color="#0066CC"/>
                                        </TouchableOpacity>
                                    </View></>
                                : <><View>
                                        <Text style={styles.boxText}>{infoEmail}</Text>
                                        <TouchableOpacity style={styles.editButton} onPress={() => {
                                            toggleEdit(setIsEmailEdited, isEmailEdited)
                                        }}>
                                            <MaterialCommunityIcons name="pencil-outline" size={24} color="#0066CC"/>
                                        </TouchableOpacity>
                                    </View></>

                        }

                        {
                            isDescEdited ? <><View>
                                    <TextInput style={styles.textInputStyle}
                                               textAlign={"left"}
                                               textAlignVertical={"top"}
                                               multiline={true}
                                               placeholder={infoDesc}
                                               onChangeText={(newDesc) => setTemporaryDesc(newDesc)}
                                    />
                                    <TouchableOpacity style={styles.cancelButton} onPress={() => {
                                        toggleEdit(setIsDescEdited, isDescEdited)
                                    }}>
                                        <MaterialCommunityIcons name="cancel" size={24} color="#B20600" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.editButton} onPress={() => {
                                        toggleEdit(setIsDescEdited, isDescEdited)
                                        data.info_desc = temporaryDesc
                                        console.log(data)
                                    }}>
                                        <AntDesign name="check" size={24} color="#0066CC"/>
                                    </TouchableOpacity>
                            </View></>
                                : <><View>
                                    <Text style={styles.boxText}>{infoDesc}</Text>
                                    <TouchableOpacity style={styles.editButton} onPress={() => {
                                        toggleEdit(setIsDescEdited, isDescEdited)
                                    }}>
                                        <MaterialCommunityIcons name="pencil-outline" size={24} color="#0066CC"/>
                                    </TouchableOpacity>
                            </View></>
                        }

                    </> : null
                }
                <TouchableOpacity onPress={() => {
                    navigation.navigate("HomeScreen");
                }}>
                    <Text style={styles.boxText}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsScreen;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    mainArea: {
        flex: 1,
    },
    header: {
        marginTop: 65,
        marginLeft: 15,
        marginBottom: 15,
    },
    headerText: {
        fontFamily: "Outfit-Bold",
        fontSize: 28,
    },
    boxText: {
        height: 56,
        lineHeight: 56,
        fontSize: 18,
        fontFamily: "Outfit-Medium",
        paddingLeft: 10,
        backgroundColor: "#F4F4F4",
        marginBottom: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    welcome: {
        marginTop: 20,
        marginBottom: 15,
        fontSize: 18,
        fontFamily: "Outfit-Medium"
    },
    editButton: {
        position: "absolute",
        right: 0,
        margin: 16
    },
    cancelButton: {
        position: "absolute",
        right: 40,
        margin: 16,
    },
    textInputStyle: {
        height: 56,
        fontSize: 18,
        textAlignVertical: "center",
        fontFamily: "Outfit-Medium",
        paddingLeft: 10,
        backgroundColor: "#F4F4F4",
        marginBottom: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingRight: 80
    },


});
