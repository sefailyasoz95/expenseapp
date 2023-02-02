import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AppStackParams} from '../../Types/types';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../Constants/Colors';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {HEIGHT, WIDTH} from '../../Constants/Constants';

type Props = {
  navigation: BottomTabNavigationProp<AppStackParams, 'DashboardScreen'>;
  route: RouteProp<AppStackParams, 'DashboardScreen'>;
};

const DashboardScreen = ({navigation, route}: Props) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [35, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: Colors.secondary,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: Colors.secondary,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(250,250,250, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          color: 'white',
          paddingHorizontal: 21,
          textAlign: 'center',
        }}>
        Sizin için bir sonraki versiyonda bu ekranda kullanabileceğiniz bazı
        grafikler hazırlıyoruz.
      </Text>
      {/* <ScrollView>
        <View style={{paddingTop: 20}}>
          <Text style={{color: 'white', marginBottom: 10}}>
            Bir yılın özeti, aylık bazda harcamalar
          </Text>
          <BarChart
            data={data}
            yAxisSuffix=""
            width={WIDTH * 0.95}
            height={HEIGHT < 700 ? HEIGHT * 0.26 : HEIGHT * 0.22}
            style={{
              borderRadius: 20,
              shadowColor: '#666',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.9,
              shadowRadius: 10,
              backgroundColor: Colors.secondaryDarker,
            }}
            yAxisLabel="$"
            chartConfig={chartConfig}
            // verticalLabelRotation={30}
          />
        </View>
        <View style={{paddingTop: 20}}>
          <Text style={{color: 'white', marginBottom: 10}}>
            Bir ayın özeti, haftalık bazda harcamalar
          </Text>
          <BarChart
            data={data}
            yAxisSuffix=""
            width={WIDTH * 0.95}
            height={HEIGHT < 700 ? HEIGHT * 0.26 : HEIGHT * 0.22}
            style={{
              borderRadius: 20,
              shadowColor: '#666',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.9,
              shadowRadius: 10,
              backgroundColor: Colors.secondaryDarker,
            }}
            yAxisLabel="$"
            chartConfig={chartConfig}
            // verticalLabelRotation={30}
          />
        </View>
        <View style={{paddingTop: 20}}>
          <Text style={{color: 'white', marginBottom: 10}}>
            Bu hafta vs önceki hafta OR bu ay vs önceki ay
          </Text>
          <BarChart
            data={data}
            yAxisSuffix=""
            width={WIDTH * 0.95}
            height={HEIGHT < 700 ? HEIGHT * 0.26 : HEIGHT * 0.22}
            style={{
              borderRadius: 20,
              shadowColor: '#666',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.9,
              shadowRadius: 10,
              backgroundColor: Colors.secondaryDarker,
            }}
            yAxisLabel="$"
            chartConfig={chartConfig}
            // verticalLabelRotation={30}
          />
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
