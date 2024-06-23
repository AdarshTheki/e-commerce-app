import axios from 'axios';

// baseURL=http://localhost:8000/api/v1
// baseURL=https://full-stack-ecommerce-api-pi.vercel.app/api/v1
// baseURL=https://full-stack-ecommerce-app-sq9o.onrender.com/api/v1

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
