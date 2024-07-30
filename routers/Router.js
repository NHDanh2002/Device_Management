import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Admin from "../screens/Admin";
import Register from "../screens/Register";
import Walkthrough from "../screens/Walkthrough";
import ForgotPass from "../screens/ForgotPass";
import User from "../screens/User";

const Stack = createStackNavigator()

const Router = ()=>{
    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Admin" component={Admin}/>
            <Stack.Screen name="User" component={User}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Walkthrough" component={Walkthrough}/>
            <Stack.Screen name="ForgotPass" component={ForgotPass}/>            
        </Stack.Navigator>
    )
}
export default Router