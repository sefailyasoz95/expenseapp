import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import HomeSvg from '../../Assets/Icons/HomeSvg';
import {Colors} from '../../Constants/Colors';
import {HEIGHT} from '../../Constants/Constants';
import {responsive} from '../../utils/Helpers';
import Icon from '../Icon/Icon';
import NeumorphismButton from '../NeumorphismButton/NeumorphismButton';
import NeumorphismTabBarButton from '../NeumorphismButton/NeumorphismTabBarButton';

type Props = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

const TabBar = ({state, descriptors, navigation}: Props) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          console.log('here');

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}>
            <NeumorphismTabBarButton
              onPress={onPress}
              height={HEIGHT < 700 ? 80 : 70}
              focused={isFocused}
              width={HEIGHT < 700 ? 90 : 80}
              icon={<Icon name={label.toString()} selected={isFocused} />}
            />
            {/* <Icon key={index} name={label.toString()} selected={isFocused} /> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    height: responsive(100),
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
export default TabBar;
