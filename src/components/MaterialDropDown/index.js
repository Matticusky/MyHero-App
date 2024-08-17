import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { useState, memo } from "react";
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { Colors, Fonts, Icons } from "../../assets";
import { CommonStyles, FontSize, UtilityMethods } from "../../utility";
const MaterialDropDown = ({
    placeHolder,
    menuData = [],
    menuStyle = {},
    onPress,
    invoiceItem,
}) => {
    let height = UtilityMethods.hp(6) * menuData.length;
    const [visible, setVisible] = useState(false);
    const hideMenu = (i, invoiceItem) => {
        setTimeout(() => {
            setVisible(false);
        }
            , 100);
        if (onPress) onPress(i, invoiceItem);
    };
    const showMenu = () => setVisible(true);
    return (
        <Menu
            visible={visible}
            style={styles.dropDown}
            contentStyle={{
                backgroundColor: Colors.WHITE,
            }}
            anchor={
                <TouchableOpacity
                    onPress={() => {
                        setVisible(true);
                    }}
                    style={styles.menuStyle}
                    activeOpacity={0.8}
                >
                    <Icons.DotIcon width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
                </TouchableOpacity>
            }
            onDismiss={() => hideMenu("")}
        >
            {menuData?.map((item, index) => {
                let Icon = item?.Icon;
                return (
                    <Menu.Item
                        style={styles.MenuItem}
                        key={index}
                        onPress={() => hideMenu(item?.value, invoiceItem)}
                        title={
                            <View style={styles.menuItemView}>
                                {item?.icon}
                                <Text style={styles.menuTxt}>{item?.label}</Text>
                            </View>
                        }
                    />
                );
            })}
        </Menu>
    );
};
export default memo(MaterialDropDown);
const styles = StyleSheet.create({
    dropDown: {
        borderRadius: UtilityMethods.wp(1),
        alignItems: "center",
        justifyContent: "center",
        width:UtilityMethods.wp(30),
        paddingTop:UtilityMethods.hp(8),
        
    },
    dropDownLabel: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.VALUE(14),
        textAlign: "center",
        color: "#FFFFFF",
        width:UtilityMethods.wp(40),
    },
    menuStyle: {
        width: UtilityMethods.wp(6),
        height: UtilityMethods.wp(6),
        borderRadius: UtilityMethods.wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuTxt: {
        fontFamily: Fonts.REGULAR,
        fontStyle: "normal",
        fontSize: FontSize.VALUE(14),
        color: Colors.BLACK,
        marginLeft: UtilityMethods.wp(2),
    },
    itemView: {
        columnGap: UtilityMethods.wp(5),
        // width: "50%"
    },
    menuItemView: {
        flexDirection: "row",
        alignItems: "center",
    },
});