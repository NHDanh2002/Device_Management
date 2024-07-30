import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Divider, Text} from "react-native-paper"
import Routercustomers from "../routers/RouterCustomers"
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator} from "@react-navigation/drawer"
import { useMyContextController } from "../store"
import { useEffect, useState } from "react"
import RouterSetting from "../routers/RouterSetting"
import ErrorDevices from "../screens/ErrorDevices"
import Statistic from "./Statistic"
import RouterDevice from "../routers/RouteDevice"
import RouterMyDevices from "../routers/RouterMyDevices"
import RouterMyErrorDevices from "../routers/RouterMyErrorDevices"
const CustomDrawer = props =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller 
    const [fullname, setFullname] = useState(userLogin?.fullname || '');
    const [role, setRole] = useState(userLogin?.role || '');
    const [avatar, setAvatar] = useState(userLogin?.avatar || '')

    useEffect(() => {
        if (userLogin) {
            setFullname(userLogin.fullname || '');
            setAvatar(userLogin?.avatar || '');
        }
    }, [userLogin]);
    return(
        <DrawerContentScrollView {...props}>
            <View style={{flexDirection:"row", margin: 10}}>
                <Image
                    source={avatar ? { uri: avatar } : require('../assets/user.png')}
                    style={styles.avatar}
                />
                <View style={{justifyContent:"center", paddingLeft: 5}}>
                    <Text style={{marginBottom:5, fontSize:18}}>
                        {fullname}
                    </Text>
                    <Text style={{fontSize:15, color:"gray"}}>
                        {role}
                    </Text>
                </View>
            </View>
            <Divider/>
            <DrawerItemList {...props}/>
            <Divider/>
        </DrawerContentScrollView>
    )
}

const Drawer = createDrawerNavigator()

const User = () =>{
    return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>}>
            <Drawer.Screen name="RouterMyDevices" component={RouterMyDevices}
                options={{
                    drawerLabel: "THiết bị của tôi",
                    headerTitle: "Thiết bị của tôi",
                    drawerIcon: ({ tintColor }) => (
                        <Image
                          source={require('../assets/responsive.png')}
                          style={[styles.icon, { tintColor: tintColor }]}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="RouterMyErrorDevices" component={RouterMyErrorDevices}
                options={{
                    drawerLabel: "THiết bị lỗi của tôi",
                    headerTitle: "Thiết bị lỗi của tôi",
                    drawerIcon: ({ tintColor }) => (
                        <Image
                          source={require('../assets/computer.png')}
                          style={[styles.icon, { tintColor: tintColor }]}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="RouterSetting" component={RouterSetting}
                options={{
                    drawerLabel: "Thông tin cá nhân",
                    headerTitle: "Thông tin cá nhân",
                    drawerIcon: ({ tintColor }) => (
                        <Image
                            source={require('../assets/user.png')}
                            style={[styles.icon, { tintColor: tintColor }]}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}
export default User
const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
    avatar: {
      width: 80,
      height: 80,
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 75,
    },
});