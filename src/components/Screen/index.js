import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home1 from "../../containers/HomeScreen";
import SignupForm from "../../containers/SignupScreen";
import { ThemeContext } from "../AppProvider";
import MovieList from "../../containers/MovieList";

const Stack = createNativeStackNavigator();

export const Screen = () => {
  const { hasUser } = useContext(ThemeContext);
  const isEmptyUser = !hasUser;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {isEmptyUser ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupForm}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="MovieList"
              component={MovieList}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
