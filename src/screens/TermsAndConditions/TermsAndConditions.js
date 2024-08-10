// TermsAndConditions.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icons } from '../../assets';
import { UtilityMethods, } from '../../utility';
import styles from './styles';
import { Header, MainLayout } from '../../components';

const TermsAndConditions = ({ navigation }) => {
    return (
        <MainLayout>
            <Header
                title={"Terms & Conditions"}
                showBackButton={true}
                DrawerHeader={false}
                rightIcons={false}
            />

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.sectionTitle}>About Our Startup:</Text>
                <Text style={styles.content}>
                    Pizza ordering services are available all over the world and hence, You can find them at any place in the world.
                    The Restaurant has always been committed to providing quality services to its customers. The company has been
                    able to cater to the needs of different groups of people.
                </Text>

                <Text style={styles.content}>
                    It certainly is a matter of pride that Foodzilla continues to present the positive image of Pakistan by setting
                    a noble example of rapid growth of the food business. The Company has been in existence for over 3 years and
                    continues to grow with each passing day. The company's success is due to its innovative approach towards the
                    delivery of pizzas to Customers.
                </Text>

                <Text style={styles.content}>
                    We have a team of professionals who are well trained and capable to deliver the quality food with good taste.
                    We have also been able to provide our customers with a variety of pizzas which are prepared according to the
                    taste buds of our customers. The Restaurant has also been able to offer various food types like <Text style={styles.boldText}>Paratha roll, Burgers, Pastas, Fried Chicken, Salad, Sandwiches and other kinds of pizzas.</Text>
                </Text>

                <Text style={styles.content}>
                    You can order your favorite pizza or other food product from anywhere in the city online through Website or App
                    designed for android and IOs and get it delivered to your home.
                </Text>
            </ScrollView>
        </MainLayout>
    );
};

export default TermsAndConditions;


