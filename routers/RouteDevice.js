import { createStackNavigator } from "@react-navigation/stack"
import Departments from "../screens/Departments"
import EditDepartment from "../screens/EditDepartment"
import AddDepartment from "../screens/AddDepartment"
import Devices from "../screens/Devices"
import DeviceDetail from "../screens/DeviceDetail"
import AddDevice from "../screens/AddDevice"

const Stack = createStackNavigator()

const RouterDevice = ()=>{
    return(
        <Stack.Navigator
            initialRouteName="Departments"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Derpartments" component={Departments}/>
            <Stack.Screen name="EditDepartment" component={EditDepartment}/>
            <Stack.Screen name="AddDepartment" component={AddDepartment}/>
            <Stack.Screen name="Devices" component={Devices}/>
            <Stack.Screen name="AddDevice" component={AddDevice}/>
            <Stack.Screen name="DeviceDetail" component={DeviceDetail}/>
        </Stack.Navigator>
    )
}
export default RouterDevice