import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTheme = () => {
  AsyncStorage.getItem("isDarkTheme", (error, token) => {
    if (error) {
      // Handle error while retrieving data
      console.error("Error retrieving data:", error);
    } else {
      // Use the retrieved value as needed
      console.log("Token:", token);
      return token;
    }
  });
};

export const setTheme = async (themeType) =>
  await AsyncStorage.setItem(
    "isDarkTheme",
    JSON.stringify({ isDarkTheme: themeType })
  );
