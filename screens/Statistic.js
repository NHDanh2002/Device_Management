import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

const firebaseConfig = {
  apiKey: 'AIzaSyApBWUABXIusWxrlvdBt9ttvTd0uSISTQY',
  projectId: 'device-management-43211',
  storageBucket: 'device-management-43211.appspot.com',
  appId: 'com.device_management',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const Statistic = () => {
  const screenWidth = Dimensions.get('screen').width;
  const [roomCountsUser, setRoomCountsUser] = useState({});
  const [roomCountsDevice, setRoomCountsDevice] = useState({});
  const [userCount, setUserCount] = useState({});

  useEffect(() => {
    const unsubscribeUserRoom = onSnapshot(collection(firestore, 'USERS'), (snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());

      const roomCountTempUser = {};

      users.forEach((user) => {
        roomCountTempUser[user.department] = (roomCountTempUser[user.department] || 0) + 1;
      });

      setRoomCountsUser(roomCountTempUser);
    });

    const unsubscribeDeviceRoom = onSnapshot(collection(firestore, 'DEVICES'), (snapshot) => {
      const devices = snapshot.docs.map((doc) => doc.data());

      const roomCountTempDevice = {};

      devices.forEach((device) => {
        roomCountTempDevice[device.departmentName] = (roomCountTempDevice[device.departmentName] || 0) + 1;
      });

      setRoomCountsDevice(roomCountTempDevice);
    });
    const unsubscribeDeviceUser = onSnapshot(collection(firestore, 'DEVICES'), (snapshot) => {
        const devices = snapshot.docs.map((doc) => doc.data());
  
        const UserCountTempDevice = {};
  
        devices.forEach((device) => {
            UserCountTempDevice[device.user] = (UserCountTempDevice[device.user] || 0) + 1;
        });
  
        setUserCount(UserCountTempDevice);
      });
    return () => {
      unsubscribeUserRoom();
      unsubscribeDeviceRoom();
      unsubscribeDeviceUser();
    };
  }, []);

  const labels = Object.keys(roomCountsUser);
  const data = {
    labels,
    datasets: [
      {
        data: Object.values(roomCountsUser),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
  };

  const labelsDevice = Object.keys(roomCountsDevice);
  const dataDeviceRoom = {
    labels: labelsDevice,
    datasets: [
      {
        data: Object.values(roomCountsDevice),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
  };

  const labelsUser = Object.keys(userCount);
  const dataDeviceUser = {
    labels: labelsUser,
    datasets: [
      {
        data: Object.values(userCount),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
  };

  return (
    <ScrollView>
      <View style={styles.legendContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thống kê người dùng theo phòng</Text>
      </View>
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 102, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={15}
        style={{ marginBottom: 20 }}
        fromZero={true}
        showValuesOnTopOfBars
      />
      <Divider bold />
      <View style={styles.legendContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thống kê thiết bị theo phòng</Text>
      </View>
      <BarChart
        data={dataDeviceRoom}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 102, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={15}
        style={{ marginBottom: 20 }}
        fromZero={true}
        showValuesOnTopOfBars
      />
      <Divider bold />
      <View style={styles.legendContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thống kê thiết bị theo người dùng</Text>
      </View>
      <BarChart
        data={dataDeviceUser}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 102, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={15}
        style={{ marginBottom: 20, paddingBottom:20 }}
        fromZero={true}
        showValuesOnTopOfBars
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  legendText: {
    fontSize: 16,
  },
});

export default Statistic;
