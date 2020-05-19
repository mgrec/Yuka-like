import * as React from 'react'
import {SafeAreaView, Platform, StyleSheet, Text, View, FlatList } from 'react-native'
import { AsyncStorage } from 'react-native'
import { useState, useEffect } from 'react'

export default function HomeScreen() {
  const [DATA, setData] = useState([]);

  const getData = () => {
    return AsyncStorage.getItem('product_history', (error, result) => {
      if (JSON.parse(result) == null){
        setData(JSON.parse(result))
      } else {
        setData(JSON.parse(result))
      }
    });
  };

  useEffect(() => {
    getData()
  });

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} score={item.score} date={item.date} />}
            keyExtractor={item => item.date}
        />
      </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function Item({ title, score, date }) {
  return (
      <View style={styles.item}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.score}>Nutriscore : {score.toUpperCase()}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingTop: Constants.statusBarHeight,
  },
  item: {
    padding: 20,
    color: 'rgba(96,100,109, 0.8)',
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-between'
  },
  title: {
    marginLeft: 20,
  },
  score: {
    marginLeft: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});