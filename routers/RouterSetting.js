import { createStackNavigator } from "@react-navigation/stack"
import Setting from "../screens/Setting"
import UpdateProfile from "../screens/UpdateProfile"

const Stack = createStackNavigator()

const RouterSetting = ()=>{
    return(
        <Stack.Navigator
            initialRouteName="Setting"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Setting" component={Setting}/>
            <Stack.Screen name="UpdateProfile" component={UpdateProfile}/>
            
        </Stack.Navigator>
    )
}
export default RouterSetting