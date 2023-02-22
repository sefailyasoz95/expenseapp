import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/Redux/store/store';
import 'react-native-gesture-handler';
import Main from './Main';
import {StatusBar} from 'react-native';
import {WebsocketProvider, socket} from './src/Context/WebSocketContext';

const App = () => {
  return (
    // <WebsocketProvider value={socket}>
    <Provider store={store}>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
    // </WebsocketProvider>
  );
};

export default App;
