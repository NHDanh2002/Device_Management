import { createStackNavigator } from "@react-navigation/stack"
import MyDetailDevices from "../screens/MyDetailDevices"
import MyDevices from "../screens/MyDevices"
import Error from "../screens/Error"

const Stack = createStackNavigator()

const RouterMyDevices= ()=>{
    return(
        <Stack.Navigator
            initialRouteName="Setting"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MyDevices" component={MyDevices}/>
            <Stack.Screen name="MyDetailDevices" component={MyDetailDevices}/>
            <Stack.Screen name="Error" component={Error}/>               
        </Stack.Navigator>
    )
}
export default RouterMyDevices