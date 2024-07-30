import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; 
import { useMyContextController } from '../store';

const MyDevices = ({route}) => {
  const [devices, setDevices] = useState([]);
  const [controller, dispatch] = useMyContextController()
  const {userLogin} = controller
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devicesRef = firestore().collection('DEVICES');
        const snapshot = await devicesRef.where('user', '==', userLogin.fullname).get();
        
        const devicesList = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }));
        
        setDevices(devicesList);
      } catch (error) {
        console.error("Error fetching devices: ", error);
      }
    };

    if (userLogin.fullname) {
      fetchDevices();
      console.log(devices)
    }
  }, []);

  const renderItem = ({ item, index }) => {
    const onPressItem = () => {
      navigation.navigate('MyDetailDevices', { deviceId: item.id });
    };

    return (
      <TouchableOpacity style={[styles.item, index !== 0 && { marginTop: 10 }]} onPress={onPressItem}>
        <View style={styles.iconContainer}>
          <Icon name="desktop" size={24} color="#000" />
        </View>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center'}}>Danh sách thiết bị của tôi</Text>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: '#e0e0e0',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default MyDevices;