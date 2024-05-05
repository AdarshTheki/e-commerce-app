import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMzNWY3YTVjY2M5NGRiMzllMmE4NzkiLCJlbWFpbCI6ImFkYXJzaHZlcm1hNTQ5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRhcnNodmVybWE1NDkiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MTQ4MTg4MDUsImV4cCI6MTcxNDk5MTYwNX0.xIgvfNlAx9hMOL8UuLix_aNPXTBwNDTF3lw24Dxi6sg`,
    },
});
