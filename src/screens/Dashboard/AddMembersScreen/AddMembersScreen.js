import { StyleSheet, Text, View } from 'react-native'
import styles from './styles'
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components'
import { useState } from 'react'
import { Icons } from '../../../assets'
import { UtilityMethods, Validator } from '../../../utility'
import AlertService from '../../../services/AlertService'

const AddMembersScreen = ({ navigation }) => {
    const [loader, setLoader] = useState(false);

    const [nickName, setNickName] = useState({
        inputType: "text",
        title: "Nick name",
        value: "",
        type: "text",
        error: "",
        placeholder: "Enter nick name",
        leftIcon: <Icons.User />
    });
    const [email, setEmail] = useState({
        inputType: "text",
        title: "Email",
        value: "",
        type: "email",
        error: "",
        placeholder: "Enter email address",
    });
    const [confirmEmail, setConfirmEmail] = useState({
        inputType: "text",
        title: "Confirm Email",
        value: "",
        type: "email",
        error: "",
        placeholder: "Confirm email address",
    });
    const [error, setError] = useState({});

    const onPressAddMember = () => {
        let error = {};

        if (nickName.value.trim() === "") {
            setNickName({ ...nickName, error: "Nick name is required" });
            error["nickName"] = "Nick name is required";
        }

        let emailValidate = Validator("email", email.value);
        if (email.value.trim() === "") {
            setEmail({ ...email, error: "Email is required" });
            error["email"] = "Email is required";
        } else if (emailValidate) {
            setEmail({ ...email, error: emailValidate });
            error["email"] = emailValidate;
        }

        let confirmEmailValidate = Validator("email", confirmEmail.value);
        if (confirmEmail.value.trim() === "") {
            setConfirmEmail({ ...confirmEmail, error: "Confirm email is required" });
            error["confirmEmail"] = "Confirm email is required";
        } else if (confirmEmail.value !== email.value) {
            setConfirmEmail({ ...confirmEmail, error: "Emails do not match" });
            error["confirmEmail"] = "Emails do not match";
        } else if (confirmEmailValidate) {
            setConfirmEmail({ ...confirmEmail, error: confirmEmailValidate });
            error["confirmEmail"] = confirmEmailValidate;
        }

        setError(error);

        if (Object.keys(error).length === 0) {
            // Proceed with adding the member
            AlertService.toastPrompt("Request send Successfully...",'success')
            navigation.goBack()
        } 
    };


    return (
        <MainLayout loader={loader}>
            <Header
                title={"Add new members"}
                rightIcons={false}
                showBackButton={true}
            />
            <ScreenWrapper style={styles.cont}>
                <View style={styles.inPutCont}>
                    <CustomizedInput
                        fieldInfo={nickName}
                        onChange={(text) => {
                            setNickName({ ...nickName, value: text, error: "" });
                        }}
                    />

                    <CustomizedInput
                        fieldInfo={email}
                        onChange={(text) => {
                            setEmail({ ...email, value: text.replace(/\s/g, ''), error: "" });
                        }}
                    />

                    <CustomizedInput
                        fieldInfo={confirmEmail}
                        onChange={(text) => {
                            setConfirmEmail({ ...confirmEmail, value: text.replace(/\s/g, ''), error: "" });
                        }}
                    />


                </View>

            </ScreenWrapper>
            <Button
                text={"Request Send"}
                style={styles.button}
                onPress={onPressAddMember}
            />
        </MainLayout>
    )
}

export default AddMembersScreen
