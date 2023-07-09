import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alerty,
} from "react-native";
import DeleteMovieIcon from "../DeleteMovieIcon";
import { ThemeContext } from "../AppProvider";
import { Color } from "../../../globalStyle";

const MovieItem = ({ movie, onDelete }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[styles.container, isDarkTheme && styles.containerDark]}
      key={`${movie.id + movie.name + Math.random()}`}
    >
      <View style={styles.movieWrapper}>
        <Image
          source={{ uri: "https://source.unsplash.com/random/?Person&1" }}
          style={styles.profileIcon}
        />
        <View style={styles.movieNameWrapper}>
          <Text style={[styles.movieName, isDarkTheme && styles.movieNameDark]}>
            {movie.name}
          </Text>
          <Text
            style={[isDarkTheme && styles.movieNameDark, styles.directorName]}
          >
            {movie.directorName}
          </Text>
        </View>
        <View style={styles.deleteIcon}>
          <DeleteMovieIcon id={movie.id} onDelete={(id) => onDelete(id)} />
        </View>
      </View>

      <Text
        numberOfLines={5}
        ellipsizeMode="tail"
        style={[styles.movieDescription, isDarkTheme && styles.movieNameDark]}
      >
        {movie.description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: "#181A1C",
  },
  movieNameWrapper: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 10,
  },
  movieWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: "8px",
  },
  movieContainer: {
    marginBottom: 10,
  },
  profileIcon: {
    width: 64,
    height: 64,
    borderRadius: 32, // To make it circular
  },
  movieName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  movieNameDark: {
    color: Color.white,
  },
  directorName: {
    fontSize: "0.25",
  },
  deleteIcon: {
    position:'absolute',
    right: 0,
  }
});

export default MovieItem;
