import { createStackNavigator } from "@react-navigation/stack"
import ErrorDevices from "../screens/ErrorDevices"
import ErrorDeviceDetail from "../screens/ErrorDeviceDetail"

const Stack = createStackNavigator()

const RouterErrorDevices= ()=>{
    return(
        <Stack.Navigator
            initialRouteName="Setting"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="ErrorDevices" component={ErrorDevices}/>
            <Stack.Screen name="ErrorDeviceDetail" component={ErrorDeviceDetail}/>       
        </Stack.Navigator>
    )
}
export default RouterErrorDevices