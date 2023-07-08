import React, { useState, createContext, useEffect } from "react";
import { StatusBar, View, Switch, StyleSheet, Text } from "react-native";
import { ThemeProvider, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setTheme } from "../../utils/getTheme";

// Create the context
const ThemeContext = createContext();

const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load saved theme preference from AsyncStorage
    loadThemePreference();
    loadUserData();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedThemePreference = await AsyncStorage.getItem(
        "themePreference"
      );
      if (savedThemePreference !== null) {
        const parsedThemePreference = JSON.parse(savedThemePreference);
        setIsDarkTheme(parsedThemePreference.isDarkTheme);
        setTheme(parsedThemePreference.isDarkTheme);
      }
    } catch (error) {
      console.log("Error loading theme preference:", error);
    }
  };

  const saveThemePreference = async (isDarkTheme) => {
    try {
      const themePreference = { isDarkTheme };
      await AsyncStorage.setItem(
        "themePreference",
        JSON.stringify(themePreference)
      );
    } catch (error) {
      console.log("Error saving theme preference:", error);
    }
  };

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      setUserData(JSON.parse(userData));
    } catch (error) {
      console.log("Error loading user data:", error);
    }
  };

  const toggleTheme = () => {
    const updatedTheme = !isDarkTheme;
    setTheme(updatedTheme);
    setIsDarkTheme(updatedTheme);
    saveThemePreference(updatedTheme);
  };

  const saveUserData = async (data) => {
    setUserData(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
  };
  // Create the context value object
  const themeContextValue = {
    isDarkTheme,
    toggleTheme,
    saveUserData,
    userData,
    hasUser: Boolean(userData),
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider useDark={isDarkTheme}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={isDarkTheme ? "#000000" : "#ffffff"}
        />
        <View style={[styles.container, isDarkTheme && styles.darkTheme]}>
          {/* Top bar */}

          <View style={[styles.topBar, isDarkTheme && styles.darkTopBar]}>
          <Text style={[styles.userName, isDarkTheme && styles.userNameDark]}>
              {userData?.user?.name}
            </Text>
            <View style={[styles.topBar, isDarkTheme && styles.darkTopBar]}>
            <Icon
              type="font-awesome-5"
              name={"moon"}
              color={isDarkTheme ? "#ffffff" : "#000000"}
              onPress={toggleTheme}
              style={styles.moonStyle}
            />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={isDarkTheme}
            />
            <Icon
              type="font-awesome-5"
              name={"sun"}
              color={isDarkTheme ? "#ffffff" : "#000000"}
              onPress={toggleTheme}
              style={styles.sunStyle}
            />
            </View>
    
          </View>
          {children}
        </View>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between"
  },
  darkTheme: {
    backgroundColor: "#000000",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: "#FCFCFD",
    color: "rgb(255, 255, 255)",
  },
  darkTopBar: {
    backgroundColor: "#181818",
  },
  moonStyle: {
    marginRight: 10,
  },
  sunStyle: {
    marginLeft: 10,
  },
  userName: {
    color: "#000000",
    left: 0,
    position: 'absolute',
    marginLeft: '20px',
  },
  userNameDark: {
    color: '#ffffff'
  }
});

export { ThemeProvider, ThemeContext };

export default AppProvider;
