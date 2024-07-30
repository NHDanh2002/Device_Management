import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; 
import { useMyContextController } from '../store';
import { IconButton } from 'react-native-paper';

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

const MyErrorDevices = ({route}) => {
  const [errors, setErrors] = useState([]);
  const [controller, dispatch] = useMyContextController()
  const {userLogin} = controller
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const errorRef = firestore().collection('ERROR');
        const snapshot = await errorRef.where('userreport', '==', userLogin.fullname).get();
        const errorList = snapshot.docs.map(doc => ({
          id: doc.id,
          deviceName: doc.data().deviceName,
          description: doc.data().description,
          fixday: doc.data().fixday,
          reportday: doc.data().reportday,
          state: doc.data().state,
          userreport: doc.data().userreport
        }));
        
        setErrors(errorList);
      } catch (error) {
        console.error("Error fetching devices: ", error);
      }
    };

    if (userLogin.fullname) {
      fetchDevices();
      console.log(errors)
    }
  }, []);

  const handleSelectErrorDevice = (item) => {
    navigation.navigate('MyErrorDeviceDetail', { item });
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
        data={errors}
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

export default MyErrorDevices;