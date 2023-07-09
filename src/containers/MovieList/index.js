import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, ActivityIndicator, Alert , StyleSheet} from 'react-native';
import MovieItem from '../../components/MovieItem';
import { getMovieList } from '../../utils/movieList';
import { Color } from '../../../globalStyle';
import { ThemeContext } from '../../components/AppProvider';

const MovieList = () => {
  const {isDarkTheme} = useContext(ThemeContext)
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);
  

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
      console.log('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = (movieId) => {
    // Replace this block with your delete movie logic
    Alert.alert('Movie Deleted', `Movie with ID ${movieId} has been deleted.`);
  };

  const renderItem = ({ item }) => <MovieItem movie={item} onDelete={deleteMovie} />;

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" />;
  };

  const handleLoadMore = () => {
      loadMovies();
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.containerDark]}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
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
    overflow: 'scroll',
    height: '92vh',
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: Color.black
  }
});

export default MovieList;