import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Text } from 'native-base';
import * as api from '../network/api'
import * as appActions from '../store/actions/app-actions'
import SpaceExplorer from '../components/stellar-explorer'
export default function PlanetsScreen() {
   //TODO render this in grid and make it fun god damn it
  const [page, updatePage] = useState(1)
  const [planets, updatePlanets] = useState([])
  const [star, updateStar] = useState(null)
  const [selectedPlanet, updateSelectedPlaent] = useState(null)
  const [root, updateRoot] = useState(null)
  const [ready, updateReady] = useState(false)
  
  function getStarData() {
    api.getSystems(page)
       .then(response => {
         updatePlanets(response.data.planets);updateStar(response.data.star);
       })
       .then(() => { updateReady(true) })
       .catch(e => appActions.error("An error occured in getPlanets" + e.message))
  }

  /**
   * Get next system
   */
  const getNextSystem = () => {

  }

  const getIcon = planet => {
    //@TODO
  }

  //On Load
  useEffect(() => {
    getStarData()
  }, [])

  renderExplorer = () => 
    ready 
        ? (<>
            <SpaceExplorer planets={planets} star={star} />
            <Button full primary>
              <Text>
                FTL Drive
              </Text>
            </Button>
        </>)
        : (<ActivityIndicator />)


  return renderExplorer()
}

PlanetsScreen.navigationOptions = {
  title: 'Planet Explorer',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
