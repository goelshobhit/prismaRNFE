import api from "./request";

export const getMovieList = async (page) => {
  let data = JSON.stringify({
    "query": "query Movies($filter: String, $orderKey: String, $orderDirection: SortDirection, $offset: Int, $limit: Int) {\r\n  movies(filter: $filter, orderKey: $orderKey, orderDirection: $orderDirection, offset: $offset, limit: $limit) {\r\n    name\r\n    id\r\n    directorName\r\n    description\r\n  }\r\n}",
    "variables": {
      "offset": page,
      "limit": 10,
      "orderKey": "name",
      "orderDirection": "ASC"
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/graphql',
    headers: {
      'content-type': 'application/json'
    },
    data: data
  };

  try {
    const response = await api.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error retrieving movie list');
  }
};


export const searchMovieList = async (movie) => {
  let data = JSON.stringify({
    "query": "query Movies($filter: String, $orderKey: String, $orderDirection: SortDirection, $offset: Int, $limit: Int) {\r\n  movies(filter: $filter, orderKey: $orderKey, orderDirection: $orderDirection, offset: $offset, limit: $limit) {\r\n    name\r\n    id\r\n    directorName\r\n    description\r\n  }\r\n}",
    "variables": {
      "filter": movie,
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/graphql',
    headers: {
      'content-type': 'application/json'
    },
    data: data
  };

  try {
    const response = await api.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error retrieving movie list');
  }
};
