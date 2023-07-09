// api.js

import api from "./request";

export const deleteMovie = async (movieId) => {
  try {
    await api.delete(`/api/v1/movie/delete`, {
      data: { id: movieId },
    });

  } catch (error) {
    console.error(error);
  }
};
