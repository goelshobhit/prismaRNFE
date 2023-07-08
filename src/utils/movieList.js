const axios = require('axios');
let data = JSON.stringify({
  "query": "query Movies($filter: String, $orderKey: String, $orderDirection: SortDirection, $offset: Int, $limit: Int) {\r\n  movies(filter: $filter, orderKey: $orderKey, orderDirection: $orderDirection, offset: $offset, limit: $limit) {\r\n    name\r\n    id\r\n    directorName\r\n    description\r\n  }\r\n}",
  "variables": {
    "offset": 1,
    "limit": 100,
    "orderKey": "directorName",
    "orderDirection": "ASC"
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8080/graphql',
  headers: { 
    'content-type': 'application/json', 
    'Authorization': 'eyJraWQiOiJkLTE2ODg2MzEwNzY5MjkiLCJ0eXAiOiJKV1QiLCJ2ZXJzaW9uIjoiMyIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1YTdkZWY0OS01MTRhLTQxOTEtOGQ0MC0wYTA3YmJkYjBmNDIiLCJleHAiOjE2ODg2NTk1OTksImlhdCI6MTY4ODY1NTk5OSwic2Vzc2lvbkhhbmRsZSI6ImMxNzg1Yjk5LTQxZjMtNGMyZS04MmYxLWIxZjc0ZDAzODJiMCIsInJlZnJlc2hUb2tlbkhhc2gxIjoiYjQxYTAwMWVmZjc0NmNmMTc2ODdhMWE4ZTg4YjAyN2EwOTYwYmQ3Njc5ZjQxOTcwZTM0MjFlODVjNWQ0Y2IzYiIsInBhcmVudFJlZnJlc2hUb2tlbkhhc2gxIjpudWxsLCJhbnRpQ3NyZlRva2VuIjpudWxsLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL3YxL2F1dGgifQ.EL04H4KwXdPuEJ5sc_FuLc80yIXkerXo37h89fPJkKzlWAz69PU4eJCw_-rAxGttd-0DYR-esScyT-XNglcO1L1ObYKg84Zp3yiiR45afqYuRITp-P4O5oKalSBiLooLRKrEi3I4T9kXpKgCYE3TlO8CoUzQx1d210Ajhf7PgKZ94n4mclFCPhM9ZJ7c2YwnhWwGTepwV8VyMdfI6RXGNao9UVD_qvd3ZOBXCOnr1odwK_bj2nXpcFz0a8XCwrBm4Giv04ndyEAlRYuHVkc6G092bd1p0jSnIJYM24twATCuu7pyO75YC1sxlWhi6_O9k6B6S8lvksQV356-YkeDTQ'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
