import React, { useState } from 'react';
import { Text, View ,Image, FlatList, TouchableOpacity, Alert} from 'react-native';
import { useDispatch } from 'react-redux';


import styles from './styles';
import { Button, MainLayout } from '../../../components';
import { Images } from '../../../assets';
import { UserTypes } from '../../../Data/DummyData';
import { UtilityMethods } from '../../../utility';
import { setUser } from '../../../redux/Reducers/AuthReducer';

const UserType = ({navigation}) => {

  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState(null);

  const onPressButton = () => {

    if(selectedUser)
      {
        navigation.navigate('Login',{
          selectedUser:selectedUser
        
        })
      }
    else{
      Alert.alert("Please select a role to sign in")
    }
  }


  return (
    <MainLayout >
      <View style={styles.cont}>
       <Image source={Images.LOGO} style={styles.logo} />
        <Text
        style={styles.mainText}
        >
        Sign In
        </Text>
        <Text
        style={styles.regText}
        >
          Please select a role to sign in
        </Text>
         <View style={styles.list}>
         <FlatList
        
        contentContainerStyle={{marginTop:UtilityMethods.hp(2)}}
         data={UserTypes}
          keyExtractor={(item)=>item.id.toString()}
          renderItem={({item})=>(
            <TouchableOpacity
            onPress={()=>{
              setSelectedUser(item.name)
            
              // navigation.navigate('Login')
            
            }}
            style={styles.userTypeCont(
              selectedUser==item.name
            
            )}
            >
              <Text style={styles.userText(
                selectedUser==item.name
              )}>{item.name}</Text>

              <View style={styles.radioButton(
                selectedUser==item.name
              )}>
                <View style={styles.insideRadio(
                  selectedUser==item.name
                
                )}/>

              </View>
            </TouchableOpacity>
          )}
        />

         </View>
        

        <Button 
         text={"Next"}
         onPress={ () =>{
          onPressButton()
         }
         }
         
         />


      </View>

    </MainLayout>
  );
}

export default UserType;
