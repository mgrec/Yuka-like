import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default function LinksScreen({ route, navigation }) {

  if (!route.params) {
    return (
        <View style={styles.containerErrorParams}>
          <Text style={styles.textErrorParams}>No product scan yet! Go to scan a product please...</Text>
        </View>
    );
  } else {
    const product     = route.params.product;

    let img           = product.image_front_url.toString();
    let name          = product.product_name_fr.toString();
    let weight        = product.quantity.toString();
    let score         = product.nutrition_grades.toString();
    let fat           = product.nutriments.fat_100g.toString();
    let sugar         = product.nutriments.sugars_value.toString();
    let salt          = product.nutriments.salt.toString();
    let saturated     = product.nutriments;
    saturated         = saturated['saturated-fat'].toString();
    let nutriscoreUri = "https://static.openfoodfacts.org/images/misc/nutriscore-" + score + ".png".toString();

    return (
        <View style={styles.container}>
          <Image source={{uri: img}} style={{width: "30%", height: "30%", margin: 20}}/>
          <View style={styles.text_wrap}>
            <View>
              <Text>Nom du produit : {name}</Text>
              <Text>Poids : {weight}</Text>
            </View>

            <View style={styles.space}>
              <Text>Matière Grasses/Lipides : {fat} g</Text>
              <Text>Acides Gras Saturés : {saturated} g</Text>
              <Text>Sucre : {sugar} g</Text>
              <Text style={styles.lastItem}>Sel : {salt} g</Text>
              <Image source={{uri: nutriscoreUri}} style={{width: 140, height: 80}}/>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
  },
  text_wrap:{
    paddingTop: 20,
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  containerErrorParams : {
    flex: 1,
    justifyContent: "center",
    flexDirection: 'row',
  },
  lastItem : {
    paddingBottom: 18
  },
  space :{
    paddingTop: 15,
  },
  textErrorParams : {
    paddingTop: 30
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
