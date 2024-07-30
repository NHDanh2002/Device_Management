import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity, Alert } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Device = ({ name, state, dayfix, onPress }) => (
  <View style={{borderRadius: 10, borderWidth: 0.5, padding: 15, margin: 10}}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <Text style={{ fontSize: 20 }}>{name}</Text>
        </TouchableOpacity>
        <IconButton
            icon={state === "Error"? "cancel": "check"}
            style={{borderWidth:1, backgroundColor: {}}}
            size={24}
        />
    </View>
    <Text>{state === "Fixed"? `Fixed: ${dayfix}`: "Chưa sửa" }</Text>
  </View>
);

const ErrorDevices = ({ navigation }) => {
  const [errordevices, setErrordevices] = useState([]);
  const ERROR = firestore().collection('ERROR');

  useEffect(() => {
    const unsubscribe = ERROR.onSnapshot((querySnapshot) => {
      const errorDevicelist = [];
      querySnapshot.forEach((doc) => {
        const { deviceName, description, fixday, reportday, state, userreport } = doc.data();
        errorDevicelist.push({
          id: doc.id,
          deviceName,
          description,
          fixday,
          reportday,
          state,
          userreport,
        });
      });
      setErrordevices(errorDevicelist);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectErrorDevice = (item) => {
    navigation.navigate('ErrorDeviceDetail', { item });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
      </View>
      <FlatList
        data={errordevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Device
            name={item.deviceName}
            state={item.state}
            dayfix={item.fixday}
            onPress={() => handleSelectErrorDevice(item)}
          />
        )}
      />
    </View>
  );
};

export default ErrorDevices;
