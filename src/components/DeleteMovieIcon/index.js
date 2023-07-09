import React, { useState , useContext} from 'react';
import { View, Text, StyleSheet, Pressable
, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from "../AppProvider";
import { Color } from "../../../globalStyle";

const DeleteMovieIcon = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleDeletePress = () => {
    console.log('i m cliced')
    Alert.alert(
      "Delete Movie",
      "The profile will be deleted permanently and won’t be available anymore.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Call your API to delete the movie
            // ...
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Pressable onPress={handleDeletePress}>
      <View style={styles.container}>
        <MaterialIcons
          name="more-vert"
          size={18}
          color={!isDarkTheme ? Color.black : Color.whiteWhite}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default DeleteMovieIcon;
