import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/Home/HomeScreen';
import {HomeStackParams} from '../../Types/types';
import ActivityItemScreen from '../../Screens/Home/ActivityItemScreen';

const Home = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Home.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Home.Screen
        name="ActivityItemScreen"
        component={ActivityItemScreen}
        options={{
          title: 'ActivityItem',
          presentation: 'transparentModal',
        }}
      />
    </Home.Navigator>
  );
};

export default HomeStack;
