import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Apod } from '../components/Apod'
import { MonoText } from '../components/StyledText';

export default function HomeScreen() {

  const apod = useSelector(store => store.homeReducer.apod)
  const test = useSelector(store => store)
  console.log("testing thes tore", { test })

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/logo.png')
            }
            style={styles.welcomeImage}
          />
      </View>
      <Apod data={apod} />
      <Card>
          <CardItem cardBody>
              <Image source={require('../assets/images/static/earth.png')} style={{height: 200, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Body>
                <Text>Activity in the Solar System</Text>
            </Body>
          </CardItem>
       </Card>
       <Card>
            <CardItem>
              <Text>Open Science Tools</Text>
            </CardItem>
            <CardItem>
              <Icon active name="ios-camera" />
              <Text>Earth E.P.I.C.</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="ios-planet" />
              <Text>Orbitals and Near Earth Objects</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="ios-paper" />
              <Text>News</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="ios-cog" />
              <Text>Tools</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
        </Card>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
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
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
