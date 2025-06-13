import axios from "axios";
export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
  // timeout: 5000,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTg2NjgzOGM5MmQyZDNjMjQ5YmY5ZmYxOGM4YTJjNSIsIm5iZiI6MTcyMzU4NzUyMS4wNzk4NjksInN1YiI6IjY2YmJkYWVhYmU3ODkzZDA5NDIxM2Q0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UaUBFbuOluqoUFS1QH6pFL8XJwA3n3DKUgSe2Yj7L-c",
  },
});

instance.interceptors.request.use((req) => {
  console.log("url>>>>>", `${req.baseURL}${req.url}`);
  return req;
});
