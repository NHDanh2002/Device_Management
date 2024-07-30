import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const CustomerItem = ({ avatar,fullname, phone, onPress }) => (
    <TouchableOpacity style={{borderRadius: 10, borderWidth:1, padding: 15, margin:10,backgroundColor:"white" }} onPress={onPress}>
      <View style={{flexDirection:"row", margin: 10}}>
                <Image
                    source={avatar ? {uri:avatar} : require('../assets/user.png')}
                    style={{height:60, width: 60, borderWidth:2, borderRadius:75}}
                />
                <View style={{justifyContent:"center", paddingLeft: 20}}>
                    <Text style={{marginBottom:5, fontSize:23}}>
                        {fullname}
                    </Text>
                    <Text style={{fontSize:18, color:"gray"}}>
                        {phone}
                    </Text>
                </View>
            </View>
    </TouchableOpacity>
  );

const Customers = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const USERS = firestore().collection('USERS');

  useEffect(() => {
    const unsubscribe = USERS.where('role', '==', 'user').onSnapshot((querySnapshot) => {
      const customerList = [];
      querySnapshot.forEach((doc) => {
        const { fullname, email, phone, role, address,avatar, department } = doc.data();
        if (role === 'user') {
          customerList.push({
            id: doc.id,
            fullname,
            email,
            phone,
            address,
            avatar, 
            department
          });
        }
      });
      setCustomers(customerList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor:"#FFFFFF", paddingTop:20 }}>
        <FlatList
            data={customers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <CustomerItem avatar={item.avatar} fullname={item.fullname} phone={item.phone} onPress={() => navigation.navigate("CustomerDetail", item)}/>
            )}
        />
    </View>
  );
};

export default Customers;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
