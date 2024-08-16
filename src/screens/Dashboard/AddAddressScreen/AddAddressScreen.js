import { Alert, Text, View } from 'react-native'
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components'
import styles from './styles'
import { useState } from 'react';
import { Icons } from '../../../assets';
import { CommonStyles, UtilityMethods, Validator } from '../../../utility';
import AlertService from '../../../services/AlertService';

const AddAddressScreen = ({navigation}) => {

    const [nameSurname, setNameSurname] = useState({
        inputType: "text",
        type: "text",
        value: '',
        error: '',
        placeholder: 'Name & Surname',
        leftIcon: <Icons.User />,
    });

    const [phoneNumber, setPhoneNumber] = useState({
        inputType: "text",
        type: "text",
        value: '',
        error: '',
        placeholder: 'Phone Number',
        leftIcon: <Icons.PhoneIcon />,
    });

    const [emailAddress, setEmailAddress] = useState({
        inputType: "text",
        value: '',
        error: '',
        type: "email",
        placeholder: 'Email Address',
    });

    const [addressTitle, setAddressTitle] = useState({
        inputType: "text",
        type: "text",
        value: '',
        error: '',
        placeholder: 'Address Title (Optional)',
        leftIcon: <Icons.address2 />,
    });

    const [streetAddress, setStreetAddress] = useState({
        inputType: "text",
        type: "text",
        value: '',
        error: '',
        placeholder: 'Address Street Apartment Name',
        leftIcon: <Icons.address2 />,
    });

    const [country, setCountry] = useState({
        inputType: "text",
        type: "text",
        value: '',
        error: '',
        placeholder: 'Country',
        leftIcon: <Icons.address2 />,
    });

    const [city, setCity] = useState({
        inputType: "text",
        type: "text",
        value: '',
        error: '',
        placeholder: 'City',
        leftIcon: <Icons.address2 />,
    });

    const [isSameAsDelivery, setIsSameAsDelivery] = useState({
        value: false,
        error: "",
        placeholder: "Same as delivery address",
        inputType: "checkbox",
        type: "checkbox",
    });

    const [isPersonal, setIsPersonal] = useState({
        value: true,
        error: "",
        placeholder: "Personal",
        inputType: "checkbox",
        type: "checkbox",
    });

    const [isCommercial, setIsCommercial] = useState({
        value: false,
        error: "",
        placeholder: "Commercial",
        inputType: "checkbox",
        type: "checkbox",
    });
    const validateForm = () => {
        let isValid = true;


        if (!Validator('phoneNumber', phoneNumber.value)) {
            setPhoneNumber({ ...phoneNumber, error: 'Please enter a valid phone number' });
            isValid = false;
        }

        if (!Validator('email', emailAddress.value)) {
            setEmailAddress({ ...emailAddress, error: 'Please enter a valid email address' });
            isValid = false;
        }

        // Add further validation as needed for other fields

        return isValid;
    };

    const handleSave = () => {
        if (validateForm()) {
            AlertService.toastPrompt("Address added successfully", 'success')
            navigation.goBack();
        } else {
        }
    };



    return (
        <MainLayout>
            <Header title="Add new address"
                showBackButton={true}
                rightIcons={false} />

            <ScreenWrapper style={[CommonStyles.BODY, styles.cont]}>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionNumber}>
                            <Text style={styles.sectionNumberText}>1</Text>
                        </View>
                        <Text style={styles.sectionTitle}>Recipients Information</Text>
                    </View>

                    <CustomizedInput
                        fieldInfo={nameSurname}
                        onChange={(text) => setNameSurname({ ...nameSurname, value: text, error: '' })}
                        style={styles.inputContainer}
                    />
                    <CustomizedInput
                        fieldInfo={phoneNumber}
                        onChange={(text) => setPhoneNumber({ ...phoneNumber, value: text, error: '' })}
                        keyboardType="number-pad"
                        style={styles.inputContainer}
                    />
                    <CustomizedInput
                        fieldInfo={emailAddress}
                        onChange={(text) => setEmailAddress({ ...emailAddress, value: text, error: '' })}
                        style={styles.inputContainer}
                    />
                    <Text style={styles.infoText}>This address will be used to send you order & bill details</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionNumber}>
                            <Text style={styles.sectionNumberText}>2</Text>
                        </View>
                        <Text style={styles.sectionTitle}>Shipping Address</Text>
                    </View>

                    <CustomizedInput
                        fieldInfo={addressTitle}
                        onChange={(text) => setAddressTitle({ ...addressTitle, value: text, error: '' })}
                        style={styles.inputContainer}
                    />
                    <Text style={styles.infoText}>For estimating if the place is opened or closed on the weekends.</Text>

                    <CustomizedInput
                        fieldInfo={streetAddress}
                        onChange={(text) => setStreetAddress({ ...streetAddress, value: text, error: '' })}
                        style={styles.inputContainer}
                    />
                    <CustomizedInput
                        fieldInfo={country}
                        onChange={(text) => setCountry({ ...country, value: text, error: '' })}
                        style={styles.inputContainer}
                    />
                    <CustomizedInput
                        fieldInfo={city}
                        onChange={(text) => setCity({ ...city, value: text, error: '' })}
                        style={styles.inputContainer}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionNumber}>
                            <Text style={styles.sectionNumberText}>3</Text>
                        </View>
                        <Text style={styles.sectionTitle}>Billing Information</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Billing Type*</Text>
                    <View style={styles.rowCont}>
                        <CustomizedInput
                            fieldInfo={isSameAsDelivery}
                            onChange={() => setIsSameAsDelivery({ ...isSameAsDelivery, value: !isSameAsDelivery.value })}
                        />
                        <Text style={styles.regText}>Same as delivery address.</Text>
                    </View>


                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        text={"Save Changes"}
                        onPress={handleSave}
                    />
                    <Button
                        text={"Discard"}
                        style={styles.changePassowrd}
                        textStyle={styles.changePassowrdText}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </ScreenWrapper>

        </MainLayout>
    )
}

export default AddAddressScreen
