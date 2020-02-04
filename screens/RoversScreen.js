import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { BASE_URL } from '../constants/Network'
export default function RoversScreen() {

  const rovers = useSelector(store => store.roverReducer.rovers)
  console.log("rovers", rovers)
  //TODO Setup image serve for these rover images

  const renderRover = rover => {
    console.log("rover with url, ", `${BASE_URL}/images/${rover.name.toLowerCase()}`)

    return (
    <Card style={{ backgroundColor: '#0e0e0e' }} key={rover.name}>
    <CardItem>
      <Left>
         <Text>{rover.name}</Text>
      </Left>
    </CardItem>
    <CardItem style={{backgroundColor: '#e3e3e3'}}>
      <Left>
         <Text>Launched: {rover.launchDate}</Text>
         <Text>Landed: {rover.landingDate}</Text>
      </Left>
    </CardItem>
    <CardItem cardBody>
        <Image source={{ uri: `${BASE_URL}/images/${rover.name.toLowerCase()}.png` }} defaultSource={require('../assets/images/static/earth.png')} style={{height: 200, flex: 1}}/>
    </CardItem>
    </Card>
  )}

  return (
    <ScrollView style={styles.container}>
        {rovers.map(renderRover)}
    </ScrollView>
  );
}

RoversScreen.navigationOptions = {
  title: 'Rovers',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
