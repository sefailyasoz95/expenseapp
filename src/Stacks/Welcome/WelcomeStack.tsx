import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../../Screens/Welcome/WelcomeScreen';

const Welcome = createNativeStackNavigator();

const WelcomeStack = () => {
  return (
    <Welcome.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Welcome.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Welcome.Navigator>
  );
};

export default WelcomeStack;
