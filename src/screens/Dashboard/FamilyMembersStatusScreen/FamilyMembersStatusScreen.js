import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { AddressCardComp, Button, Header, MainLayout } from '../../../components'
import { membersDataList } from '../../../Data/DummyData';
import styles from './styles'
import Routes from '../../../navigation/Routes';
import { Colors } from '../../../assets';


const MemberStatusCard = ({ imageSource, name, email, status, onPressStatus }) => {

    const getStyleColor = (status) =>{
        if(status === 'Connected'){
            return {
                borderColor:Colors.parotGreen
            }
        }else if(status === 'Pending'){
            return {
                borderColor:Colors.Pending
            }
        }else if(status === 'Disconnected'){
            return {
                borderColor:Colors.BLACK
            }
        }

    }
    const getTextColor = (status) =>{
        if(status === 'Connected'){
            return {
                color:Colors.parotGreen
            }
        }else if(status === 'Pending'){
            return {
                color:Colors.Pending
            }
        } else if(status === 'Disconnected'){
            return {
                color:Colors.BLACK
            }
        }
    }

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.avatar} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
            <Button
                text={status}
                style={[styles.changePassowrd,getStyleColor(status)]}
                textStyle={[styles.changePassowrdText,getTextColor(status)]}
                onPress={onPressStatus}
            />
        </View>
    );
};




const FamilyMembersStatusScreen = ({ navigation, route }) => {

    const status=route.params.status;
    console.log(status)
    const renderItem = ({ item }) => (
        <MemberStatusCard
            imageSource={item.imageSource}
            name={item.name}
            email={item.email}
            status={item.status}
            onPressStatus={() => console.log(`${item.name}'s status button pressed`)}
        />
    );


    return (
        <>
            <FlatList
                data={membersDataList.filter(item => item.status === status)}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={styles.contentContainerStyle}
            />

        </>
    )
}

export default FamilyMembersStatusScreen
