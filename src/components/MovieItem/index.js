import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const MovieItem = ({ movie, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const confirmDeleteMovie = () => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${movie.title}?`,
      [
        { text: 'Cancel', onPress: () => setConfirmDelete(false) },
        { text: 'Delete', onPress: () => onDelete(movie.id) },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDelete}>
      <Image source={{ uri: movie.poster }} style={styles.image} />
      <Text style={styles.title}>{movie.title}</Text>
      {confirmDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDeleteMovie}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MovieItem;