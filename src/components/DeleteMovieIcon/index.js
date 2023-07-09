import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Dialog, Portal, Button, Provider as PaperProvider, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from '../AppProvider';
import { Color } from '../../../globalStyle';
import { deleteMovie } from '../../utils/deleteMovie';

const DeleteMovieIcon = ({ id , onDelete}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleDeletePress = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const handleDelete = () => {
    deleteMovie(id)
    hideDialog();
    onDelete();
  };

  return (
    <>
      <Pressable onPress={handleDeletePress}>
        <View style={styles.container}>
          <MaterialIcons
            name="more-vert"
            size={18}
            color={isDarkTheme ? Color.white : Color.black}
          />
        </View>
      </Pressable>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={isDarkTheme ? styles.darkTitle : styles.lightTitle}>
            <Text style={styles.titleText}>Delete Movie</Text>
            <IconButton
              icon="close"
              size={24}
              color={isDarkTheme ? Color.white : Color.black}
              onPress={hideDialog}
              style={styles.closeIcon}
            />
          </Dialog.Title>
          <Dialog.Content>
            <Text style={isDarkTheme ? styles.darkText : styles.lightText}>
              The movie will be deleted permanently and won't be available anymore.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} color={isDarkTheme ? Color.white : Color.black}>
              Cancel
            </Button>
            <Button onPress={handleDelete} color="red">
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  darkTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    color: Color.black
  },
  lightTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    color: Color.white
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.black,
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    marginTop: '-2px',
  },
  darkText: {
    color: Color.white,
  },
  lightText: {
    color: Color.black,
  },
  dialog: {
    borderRadius: 4,
    backgroundColor: Color.white,
  },
  dialogDark: {backgroundColor: Color.black},
  text: {
    color: Color.black
  },
  textDark: {
    color: Color.white
  }
});

export default DeleteMovieIcon;
