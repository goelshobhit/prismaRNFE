import React, { useState, useEffect, useContext } from "react";
import debounce from "lodash.debounce";
import {
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MovieItem from "../../components/MovieItem";
import { getMovieList, searchMovieList } from "../../utils/movieList";
import { Color } from "../../../globalStyle";
import { ThemeContext } from "../../components/AppProvider";

const MovieList = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);



  useEffect(() => {
    if(searchQuery.length !== 0){
    // Debounce the search function with a delay of 500ms
    const debouncedSearch = debounce(searchMovies, 500);

    // Call the debounced search function whenever the search query changes
    debouncedSearch();

    // Clean up the debounce function on component unmount
    return () => {
      debouncedSearch.cancel();
    };
    } 
    
    if(searchQuery.length === 0) {
      loadMovies();
    }

  }, [searchQuery]);

  const searchMovies = async () => {
    try {
      setLoading(true);

      const response = await searchMovieList(searchQuery);

      const newMovies = response.data.movies;

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies(newMovies);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const loadMovies = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await getMovieList(page * 10); // Replace with your API endpoint
      const newMovies = response.data.movies;

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setPage((prevPage) => prevPage + 1);
      }
      
    } catch (error) {
      console.log("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = () => {
    setPage(1);
    setMovies([]);
    loadMovies();
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const renderItem = ({ item }) => (
    <MovieItem movie={item} onDelete={(id) => deleteMovie(id)} />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" />;
  };

  const handleLoadMore = () => {
    loadMovies();
  };

  const handleClear = async () => {
    setSearchQuery("");
    const response = await getMovieList(1); // Replace with your API endpoint
    const newMovies = response.data.movies;
    setMovies(newMovies);
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={isDarkTheme ? styles.darkInput : styles.lightInput}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <MaterialIcons
              name="close"
              size={24}
              color={isDarkTheme ? Color.white : Color.black}
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={2.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerDark: {backgroundColor: Color.black},
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: '100%',
  },
  darkInput: {
    flex: 1,
    backgroundColor: Color.darkBackground,
    color: Color.white,
    padding: 8,
    width: '100%',
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 12,
  },
  lightInput: {
    backgroundColor: Color.lightBackground,
    color: Color.black,
    padding: 8,
    marginBottom: 16,
    border: "1px solid #2B2B2B",
    margin: "1.5rem",
    width: '100%'
  },
});

export default MovieList;
