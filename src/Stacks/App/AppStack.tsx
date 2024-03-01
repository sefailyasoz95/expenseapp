import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../Components/TabBar/TabBar';
import DashboardScreen from '../../Screens/App/DashboardScreen';
import {AppStackParams} from '../../Types/types';
import HomeStack from '../Home/HomeStack';

const App = createBottomTabNavigator<AppStackParams>();

const AppStack = () => {
  return (
    <App.Navigator
      detachInactiveScreens={true}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => (
        <TabBar
          navigation={props.navigation}
          descriptors={props.descriptors}
          state={props.state}
        />
      )}>
      <App.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
        }}
      />

      <App.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
    </App.Navigator>
  );
};

export default AppStack;
