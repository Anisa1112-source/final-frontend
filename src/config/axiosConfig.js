import axios from 'axios';

// buat instance dasar
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Ambil token dari penyimpanan browser (localStorage)
    const token = localStorage.getItem('token');
    
    // Jika token ada, tambahkan format "Bearer <token>" ke header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {

      alert("Sesi login Anda telah berakhir.\nSilakan login kembali.");

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default apiClient;