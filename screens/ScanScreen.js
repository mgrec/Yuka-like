import  { useState, useEffect } from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AsyncStorage } from 'react-native';

export default function ScanScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        let dataJson;
        getProductDetails(data).then(res => dataJson = res);

    };

    function getProductDetails(data) {
        return fetch('https://world.openfoodfacts.org/api/v0/product/' + data + '.json')
            .then((response) => response.json())
            .then((json)     => {

                let product = json.product;
                let data_history_obj = {
                    id: product._id.toString(),
                    title: product.product_name_fr.toString(),
                    score: product.nutrition_grades.toString(),
                    date: new Date().toLocaleString()
                };

                AsyncStorage.getItem('product_history', (error, result) => {
                    if (JSON.parse(result) == null){
                        let product_scanned     = [data_history_obj];
                        AsyncStorage.setItem('product_history', JSON.stringify(product_scanned));
                    } else {
                        let products_scanned    = JSON.parse(result);
                        products_scanned.push(data_history_obj);
                        console.log(products_scanned);
                        AsyncStorage.setItem('product_history', JSON.stringify(products_scanned));
                    }
                });

                //AsyncStorage.clear();

                navigation.navigate('Links', {product:json.product})
            })
            .catch((error)  => {
                console.error(error);
            });
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});
