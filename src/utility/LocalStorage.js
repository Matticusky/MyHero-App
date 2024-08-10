import AsyncStorage from "@react-native-async-storage/async-storage";

class LocalStorageMethods {
    storeString = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) { }
    };

    getString = async (key) => {
        try {
            let value = await AsyncStorage.getItem(key);
            return value;
        } catch (e) {
            return null;
        }
    };

    storeJsonData = async (key, value) => {
        try {
            const jsonValue = value === null ? null : JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            return null;
        }
    };

    getJsonData = async (key) => {
        try {
            let jsonValue = await AsyncStorage.getItem(key);
            jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
            return jsonValue;
        } catch (e) {
            return null;
        }
    };

    removeItem = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) { }
    };

    isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };
}

const LocalStorage = new LocalStorageMethods();

export default LocalStorage;