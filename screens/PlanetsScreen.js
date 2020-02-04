import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Root } from 'native-base';
import * as api from '../network/api'
import * as appActions from '../store/actions/app-actions'
import { EmptyDeck } from '../components/EmptyDeck'
export default function PlanetsScreen() {
   //TODO render this in grid and make it fun god damn it
  const [page, updatePage] = useState(1)
  const [planets, updatePlanets] = useState([])
  const [selectedPlanet, updateSelectedPlaent] = useState(null)
  
  function getPlanetData() {
    api.getBodies(page)
       .then(response => updatePlanets(response.data.data))
       .catch(e => appActions.error("An error occured in getPlanets" + e.message))
  }

  const next = () => {
    updatePlanets(page + 1)
  }

  const prev = () => {
    updatePlanets(page - 1)
  }

  const getIcon = planet => {
    //TODO
  }

  console.log("Planets and such", planets)

  //On Load
  useEffect(() => {
    getPlanetData()
  }, [])

  return (
    <ScrollView style={styles.container}>
       <View style={{ minHeight: 700 }}>
         
      </View>
    </ScrollView>
  );
}

PlanetsScreen.navigationOptions = {
  title: 'Planet Explorer',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#010101',
  },
});
