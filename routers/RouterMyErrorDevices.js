import { createStackNavigator } from "@react-navigation/stack"
import MyErrorDeviceDetail from "../screens/MyErrorDeviceDetail"
import MyErrorDevices from "../screens/MyErrorDevices"

const Stack = createStackNavigator()

const RouterMyErrorDevices= ()=>{
    return(
        <Stack.Navigator
            initialRouteName="Setting"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MyErrorDevices" component={MyErrorDevices}/>
            <Stack.Screen name="MyErrorDeviceDetail" component={MyErrorDeviceDetail}/>      
        </Stack.Navigator>
    )
}
export default RouterMyErrorDevices