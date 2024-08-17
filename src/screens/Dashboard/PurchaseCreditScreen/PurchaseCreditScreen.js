import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';
import { Header, MainLayout } from '../../../components';

const CreditScreen = () => {
    const [creditsData, setCreditsData] = useState([
        { id: '1', credits: 100, price: 200 },
        { id: '2', credits: 200, price: 350 },
        { id: '3', credits: 300, price: 500 },
        { id: '4', credits: 500, price: 750 },
    ]);

    const handleBuyPress = (id) => {
        console.log(`Buy button pressed for item with id: ${id}`);
    };

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.creditsText}>{item.credits} Credits</Text>
                <Text style={styles.priceText}>USD ${item.price}</Text>
            </View>
            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyPress(item.id)}>
                <Text style={styles.buyButtonText}>BUY NOW</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <MainLayout>
            <Header title="Purchase Credits"
                showBackButton={true}
                DrawerHeader={false} 
                rightIcons={false}
                />


            <View style={styles.screenContainer}>
                <FlatList
                    data={creditsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </MainLayout>
    );
};

export default CreditScreen;


