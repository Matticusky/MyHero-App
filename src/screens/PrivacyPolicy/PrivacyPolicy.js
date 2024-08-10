// TermsAndConditions.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icons } from '../../assets';
import { UtilityMethods, } from '../../utility';
import styles from './styles';
import { Header, MainLayout } from '../../components';

const PrivacyPolicy = ({ navigation }) => {
    return (
        <MainLayout>
            <Header
                title={"Privacy Policy"}
                showBackButton={true}
                DrawerHeader={false}
                rightIcons={false}
            />

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.sectionTitle}>About Our Startup:</Text>
                <Text style={styles.content}>
                    At Legal Connect, accessible from https://Legal connec.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Legal Connect and how we use it.
                </Text>

                <Text style={styles.content}>
                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                </Text>

                <Text style={styles.content}>
                    This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Legal Connect This policy is not applicable to any information collected offline or via channels other than this website.
                </Text>

                <Text style={styles.sectionTitle}>Consent</Text>
                <Text style={styles.content}>
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </Text>

                
                <Text style={styles.sectionTitle}>Information we collect</Text>
                <Text style={styles.content}>
                    The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                </Text>

            </ScrollView>
        </MainLayout>
    );
};

export default PrivacyPolicy;


