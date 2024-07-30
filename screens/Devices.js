import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Devices = ({ navigation, route }) => {
  const { departmentId, departmentName } = route.params;
  const [devices, setDevices] = useState({});

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('DEVICES')
      .where('departmentName', '==', departmentName)
      .onSnapshot(
        (querySnapshot) => {
          const deviceList = {};
          querySnapshot.forEach((doc) => {
            const { name, type } = doc.data();
            if (!deviceList[type]) {
              deviceList[type] = [];
            }
            deviceList[type].push({ id: doc.id, name });
          });

          setDevices(deviceList);
        },
        (error) => {
          console.error('Error fetching devices: ', error);
        }
      );

    return () => unsubscribe();
  }, [departmentId]);

  const handleSelectDevice = (id) => {
    navigation.navigate('DeviceDetail', { deviceId: id, departmentName });
  };

  const handleAddDevice = () => {
    navigation.navigate('AddDevice', { departmentId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thiết bị thuộc phòng {departmentName}</Text>
        <IconButton
          icon="plus-circle"
          iconColor="#0000CD"
          size={35}
          onPress={() => navigation.navigate('AddDevice', {departmentName})}
        />
      </View>
      {Object.keys(devices).length === 0 ? (
        <Text>Không tìm thấy thiết bị</Text>
      ) : (
        Object.keys(devices).map((type) => (
          <View key={type} style={styles.deviceTypeContainer}>
            <Text style={styles.deviceTypeTitle}>{type}</Text>
            <Divider bold style={styles.divider} />
            <FlatList
              data={devices[type]}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View>
                  <Text
                    style={styles.deviceName}
                    onPress={() => handleSelectDevice(item.id)}
                  >
                    {item.name}
                  </Text>
                  {index < devices[type].length - 1 && <Divider bold style={styles.itemDivider} />}
                </View>
              )}
            />
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
  },
  addButton: {
    backgroundColor: '#87CEFA', // Adjust color as needed
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deviceTypeContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#87CEFA',
  },
  deviceTypeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    backgroundColor: 'black',
  },
  itemDivider: {
    backgroundColor: 'white',
  },
  deviceName: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Devices;
