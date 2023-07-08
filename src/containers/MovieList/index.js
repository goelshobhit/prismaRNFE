import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Alert } from 'react-native';
import MovieItem from '../../components/MovieItem';
import api from '../../utils/request';

const MovieList = () => {
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
      const response = await api.get(`/movies?page=${page}&limit=10`); // Replace with your API endpoint
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
    if (!loading) {
      loadMovies();
    }
  };

  return (
    <View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default MovieList;