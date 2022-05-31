import { ExpoLeaflet, MapMarker} from 'expo-leaflet'
import * as Location from 'expo-location'
import type { LatLngLiteral } from 'leaflet'
import React, { useEffect, useState } from 'react'

import {
    ActivityIndicator,
    Alert,
    Button,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { MapLayer } from 'expo-leaflet'
import {marker} from "leaflet";
import {reloadAsync} from "expo-updates";


const mapLayers: Array<MapLayer> = [
    {
        attribution:
            '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        baseLayerIsChecked: true,
        baseLayerName: 'OpenStreetMap',
        layerType: 'TileLayer',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    }
]

const mapOptions = {
    attributionControl: false,
    zoomControl: Platform.OS === 'web',
}

const initialPosition = {
    lat: 43.23205,
    lng: 5.43915,
}

const initialMapMarker: MapMarker[] = [];



export default function Map() {
    const a: MapMarker[] = [
        {
            id: '1',
            title: 'mon titre',
            position: { lat: 43.23205, lng: 5.43915 },
            icon: '📍',
            size: [32, 32],
        }
    ]
    const [zoom, setZoom] = useState(14)
    const [mapCenterPosition, setMapCenterPosition] = useState(initialPosition)
    const [ownPosition, setOwnPosition] = useState<null | LatLngLiteral>(null)
    const [mapMarker, setMapMarker] = useState<null | MapMarker[]>(a)




    let i = 100;

    const add_marker = (lat, long) => {
        let newMapMarker: MapMarker[] = [];
        for (let i = 0; i < mapMarker.length; i++) {
            newMapMarker.push(mapMarker[i]);
        }
        let marker: MapMarker = {
            id: lat.toString(),
            position: {lat: lat, lng: long},
            icon: '📍',
            size: [32, 32],
        }
        newMapMarker.push(marker);
        return newMapMarker
    }

    const remove_marker = (id)=>{
        let newMapMarker: MapMarker[]= [];
        for (let i = 0; i < mapMarker.length; i++) {
            if(!(mapMarker[i].id === id)){
                newMapMarker.push(mapMarker[i]);
            }
        }
        console.log(newMapMarker)
        return newMapMarker;

    }







    useEffect(() => {




        const getLocationAsync = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.warn('Permission to access location was denied')
            }

            let location = await Location.getCurrentPositionAsync({})
            if (!ownPosition) {
                setOwnPosition({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                })
            }
        }

        getLocationAsync().catch((error) => {
            console.error(error)
        })
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, position: 'relative' }}>
                <ExpoLeaflet
                    loadingIndicator={() => <ActivityIndicator />}
                    mapCenterPosition={mapCenterPosition}
                    mapLayers={mapLayers}
                    mapOptions={mapOptions}
                    mapMarkers={mapMarker}
                    maxZoom={18}
                    zoom={18}
                    onMessage={(message) => {

                        switch (message.tag) {
                            case "MapReady":
                                //setMapCenterPosition(ownPosition)
                                break;
                            case 'onMapMarkerClicked':
                                let newMapMarker: MapMarker[] = remove_marker(message.mapMarkerId);
                                setMapMarker(newMapMarker);

                                break
                            case 'onMapClicked':
                                let newMarker: MapMarker[] = add_marker(message.location.lat,message.location.lng)
                                setMapMarker(newMarker)
                                break
                            case 'onMoveEnd':
                                //setMapCenterPosition(message.mapCenter)
                                break
                            case 'onZoomEnd':
                                //setZoom(message.zoom)
                                break
                            default:
                                console.log(message)
                                if (['onMove'].includes(message.tag)) {
                                    return
                                }

                        }
                    }}
                    //zoom={zoom}
                />
            </View>
            <Button
                onPress={() => {
                    console.log("center")
                    setMapCenterPosition(ownPosition)
                    setZoom(7)
                }}
                title="Reset Map"
            />
        </SafeAreaView>
    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        backgroundColor: 'dodgerblue',
        paddingHorizontal: 10,
        paddingTop: 30,
        width: '100%',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    mapControls: {
        backgroundColor: 'rgba(255,255,255,.5)',
        borderRadius: 5,
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        left: 0,
        marginHorizontal: 10,
        padding: 7,
        position: 'absolute',
        right: 0,
    },
    mapButton: {
        alignItems: 'center',
        height: 42,
        justifyContent: 'center',
        width: 42,
    },
    mapButtonEmoji: {
        fontSize: 28,
    },
})
