import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Container, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as api from './network/api'
import * as roverActions from './store/actions/rover-actions'
import * as homeActions from './store/actions/home-actions'
import * as appActions from './store/actions/app-actions'
import { store } from './store/store'
import { Provider as ReduxProvider } from 'react-redux'
import AppNavigator from './navigation/AppNavigator';
import { ErrorToast } from './components/Error'
export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [dataLoad, setDataLoadingComplete]      = useState(false)
  //Preload redux
  useEffect(() => {
      api.apod()
          .then(homeActions.getApod)
          .catch(e => appActions.error(`Error in apod ${e.message}`))
      api.getRovers()
          .then(roverActions.getRovers)
          .then(() => setDataLoadingComplete(true))
          .catch(e => appActions.error(`Error in rovers ${e.message}`))
      return () => {}
  }, [])

  if (!isLoadingComplete && !props.skipLoadingScreen && !dataLoad) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <ReduxProvider store={store}>
          <Container>
            <AppNavigator />
            <ErrorToast />
          </Container>
        </ReduxProvider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
      require('./assets/images/logo.png'),
      require('./assets/images/static/earth.png'),
      require('./assets/images/curiosity.png'),
      require('./assets/images/spirit.png'),
      require('./assets/images/opportunity.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
