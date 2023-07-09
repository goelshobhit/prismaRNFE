import * as React from "react";

import { useFonts } from "expo-font";

import { Screen } from "./src/components/Screen";
import { Provider as PaperProvider } from "react-native-paper";
import AppProvider from "./src/components/AppProvider";

const App = () => {
  const [fontsLoaded, error] = useFonts({
    Roboto_regular: require("./src/assets/fonts/Roboto_regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <PaperProvider>
      <AppProvider>
        <Screen />
      </AppProvider>
    </PaperProvider>
  );
};
export default App;
