import RNCAsyncStorage from '@react-native-community';
console.log(RNCAsyncStorage, "async storage")
const localStorage = {
  store: async (key, value) => {
    try {
      const result = await RNCAsyncStorage.setItem(key, JSON.stringify(value));
      console.log('Value set successfully in localStore', {
        key,
        value,
        result,
      });
      return result;
    } catch (e) {
      console.error('An error occured in AsyncStorage store', {
        key,
        value,
        e,
      });
    }
  },
  get: async key => {
    try {
      const value = await RNCAsyncStorage.getItem(key);
      console.log('Value retrived successfully');
      return JSON.parse(value);
    } catch (e) {
      console.error('An error occured in AsyncStorage get', { key, e });
    }
  },
  flush: async () => {
    RNCAsyncStorage.clear()
  }
};

export default localStorage;