import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FamilyMembersStatusScreen } from '../../screens';
import { Colors } from '../../assets';
const Tab = createMaterialTopTabNavigator();


const FamilyMemberTopBar = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarIndicatorStyle: {
                    backgroundColor: Colors.BLACK, 
                  },
            }}
        >
            <Tab.Screen name="Connected" component={FamilyMembersStatusScreen} initialParams={{status:'Connected'}}/>
            <Tab.Screen name="Pending" component={FamilyMembersStatusScreen} initialParams={{status:'Pending'}}/>
            <Tab.Screen name="Disconnected" component={FamilyMembersStatusScreen} initialParams={{status:'Disconnected'}}/>


        </Tab.Navigator>
    )
}

export default FamilyMemberTopBar